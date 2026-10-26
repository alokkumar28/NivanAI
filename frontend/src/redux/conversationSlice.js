import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    selectedConversation: null,
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action) => {
      state.conversations.unshift(action.payload);
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setConversationTitle: (state, action) => {
      const { title, conversationId } = action.payload;
      //1: map over state.conversations, and fix the comparison/mapping
      state.conversations = state.conversations.map((conv) => {
        // Ensure we check both _id and id just in case
        if (conv._id === conversationId || conv.id === conversationId) {
          return { ...conv, title };
        }
        return conv;
      });
      //2: Update selected conversation if it matches
      if (
        state.selectedConversation?._id === conversationId ||
        state.selectedConversation?.id === conversationId
      ) {
        state.selectedConversation = { ...state.selectedConversation, title };
      }
    },
  },
});

export const {
  setConversations,
  addConversation,
  setSelectedConversation,
  setConversationTitle,
} = conversationSlice.actions;
export default conversationSlice.reducer;
