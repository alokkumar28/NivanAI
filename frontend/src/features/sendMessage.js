import api from "../../utils/axios";

async function sendMessage(payload) {
  try {
    // Just send the payload directly, no headers needed
    const { data } = await api.post("/api/agent/chat", payload);
    
    console.log("AI Response from Backend:", data);
    return data;
    
  } catch (error) {
    console.error("Error sending message:", error.response?.data || error.message);
    return null;
  }
}

export default sendMessage;