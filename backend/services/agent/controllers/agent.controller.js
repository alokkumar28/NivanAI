import { axios } from "axios";
import { graph } from "../graph/graph.js";

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;
    if (!prompt || !conversationId) {
      return res.status(400).json({
        success: false,
        message: "prompt and conversationId are required",
      });
    }
    await axios.post(`process.env.CHAT_SERVICE/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    });
    const result = await graph.invoke({
      prompt,
      conversationId,
    });
    const response = result.aiResponse;
    return res.response(200).json(response);
    
  } catch (error) {
    console.error("agent controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process request",
      error: error.message,
    });
  }
};
