import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv"
dotenv.config()
const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
});

export const getModel = async (agent) => {
  switch (agent) {
    case "router":
      return groq;
      break;
    case "chat":
      return groq;
      break;
    case "search":
      return groq;
      break;
    case "coding":
      return gemini;
      break;
    case "pdf":
      return gemini;
      break;
    case "ppt":
      return gemini;
      break;
    case "image":
      return gemini;
      break;
    default:
      return groq;
      break;
  }
};
