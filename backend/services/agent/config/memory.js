import redis from "../../../shared/redis/redis.js";
import { getMessages } from "../utils/getMessages.js";

export const getMemory = async (conversationId) => {
  if (!conversationId) {
    return [];
  }
  try {
    const key = `messages:${conversationId}`;
    const cached = await redis.get(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    const messages = (await getMessages(conversationId)) ?? [];
    await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);
    return messages;
  } catch (error) {
    console.error("getMemory error:", error);
    return [];
  }
};

export const addMessage = async (conversationId, role, content) => {
  if (!conversationId) {
    return [];
  }
  try {
    const key = `messages:${conversationId}`;
    const raw = await redis.get(key);
    const messages = raw ? JSON.parse(raw) : [];
    messages.push({ role, content });
    if (messages.length > 20) {
      messages.shift();
    }
    await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);
  } catch (error) {
    console.error("addMessage error:", error);
  }
};
