import {  StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { routerAgent } from "./router.agent.js";
import { chatAgent } from "../agents/chat.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { imageAgent } from "../agents/image.agent.js";
import { searchAgent } from "../agents/search.agent.js";

const workflow = new StateGraph(agentState);

workflow.addNode("router" , routerAgent);
workflow.addNode("chat" , chatAgent);
workflow.addNode("search" , searchAgent);
workflow.addNode("coding" , codingAgent);
workflow.addNode("pdf" , pdfAgent);
workflow.addNode("ppt" , pptAgent);
workflow.addNode("image" , imageAgent);

workflow.addEdge("__start__" , "router")
workflow.addConditionalEdges("router" ,(state)=>{
    switch (state.agent) {
        case "chat":
            return "chat";
            break;
        case "search":
            return "search";
            break;
        case "coding":
            return "coding";
            break;
        case "pdf":
            return "pdf";
            break;
        case "ppt":
            return "ppt";
            break;
        case "image":
            return "image";
            break;
        default:
            return "chat";
            break;
    }
},{
    chat:"chat",
    search:"search",
    coding:"coding",
    pdf:"pdf",
    ppt:"ppt",
    image:"image"
} )

workflow.addEdge("search" , "chat");
workflow.addEdge("chat", "__end__");
workflow.addEdge("search", "__end__");
workflow.addEdge("coding", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("image", "__end__");

export const graph = workflow.compile()
