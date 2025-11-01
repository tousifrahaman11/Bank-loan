import { createSlice } from '@reduxjs/toolkit';

const loadChatHistory = () => {
  try {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  messages: loadChatHistory(),
  isTyping: false,
  currentStage: 'conversation',
  sessionId: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({
        ...action.payload,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('chatHistory', JSON.stringify(state.messages));
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    setStage: (state, action) => {
      state.currentStage = action.payload;
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.isTyping = false;
      state.currentStage = 'conversation';
      localStorage.removeItem('chatHistory');
    },
    loadMessages: (state, action) => {
      state.messages = action.payload;
      localStorage.setItem('chatHistory', JSON.stringify(action.payload));
    }
  }
});

export const { 
  addMessage, 
  setTyping, 
  setStage, 
  setSessionId, 
  clearChat, 
  loadMessages 
} = chatSlice.actions;

export default chatSlice.reducer;
