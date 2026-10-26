import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage, getMemory } from "../config/memory.js";
import { getModel } from "../config/llm.models.js";

const generateTitle = async (prompt) => {
  try {
    const llm = await getModel("chat");
    const response = await llm.invoke(
      `Generate a short, 3-4 word title for a conversation starting with: "${prompt}". Return ONLY the title text, no quotes, no punctuation, no extra text.`,
    );
    return response.content.replace(/["']/g, "").trim() || "New Chat";
  } catch (error) {
    console.error("Title generation error:", error);
    return "New Chat";
  }
};

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;

    if (!prompt || !conversationId) {
      return res.status(400).json({
        success: false,
        message: "prompt and conversationId are required",
      });
    }

    const history = await getMemory(conversationId);
    const isFirstMessage = history.length === 0;

    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    await addMessage(conversationId, "user", prompt);

    const result = await graph.invoke({ prompt, conversationId });

    let response = result.aiResponse;
    if (Array.isArray(response)) {
      response = response.map((block) => block.text || "").join("");
    }

    if (!response || typeof response !== "string" || response.trim() === "") {
      return res.status(500).json({
        success: false,
        message: "Agent failed to generate a valid response.",
      });
    }

    await addMessage(conversationId, "assistant", response);
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
    });

    if (isFirstMessage) {
      generateTitle(prompt).then(async (newTitle) => {
        try {
          await axios.post(`${process.env.CHAT_SERVICE}/update-conversation`, {
            id: conversationId,
            title: newTitle,
          });
          console.log(`Title updated to: "${newTitle}"`);
        } catch (err) {
          console.error(
            "Failed to update title in DB:",
            err.response?.data || err.message,
          );
        }
      });
    }

    return res.status(200).json({ response });
  } catch (error) {
    console.error("agent controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process request",
      error: error.message,
    });
  }
};
