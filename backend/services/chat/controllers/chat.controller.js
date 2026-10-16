import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: missing user context",
      });
    }
    const conversation = await Conversation.create({
      userId,
    });
    return res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      conversation,
    });
  } catch (error) {
    console.error("createConversation error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create conversation",
      error: error.message,
    });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: missing user context",
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "title is required",
      });
    }

    const conversation = await Conversation.findOneAndUpdate(
      { _id: id, userId },
      { title },
      { new: true, runValidators: true }
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conversation updated successfully",
      conversation,
    });
  } catch (error) {
    console.error("updateConversation error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update conversation",
      error: error.message,
    });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: missing user context",
      });
    }
    const conversations = await Conversation.find({ userId }).sort({
      updatedAt: -1, 
    });
    return res.status(200).json({
      success: true,
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    console.error("getConversations error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
      error: error.message,
    });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: missing user context",
      });
    }

    if (!conversationId || !role || !content) {
      return res.status(400).json({
        success: false,
        message: "conversationId, role and content are required",
      });
    }

    if (!["user", "assistant"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "role must be either 'user' or 'assistant'",
      });
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    const message = await Message.create({
      conversationId,
      role,
      content,
    });

    conversation.updatedAt = new Date();
    await conversation.save();

    return res.status(201).json({
      success: true,
      message: "Message saved",
      message,
    });
  } catch (error) {
    console.error("saveMessage error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save message",
      error: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "conversationId is required",
      });
    }

    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1, 
    });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("getMessages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};