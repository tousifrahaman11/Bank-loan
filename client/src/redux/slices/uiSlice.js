import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  chatOpen: false,
  modalOpen: null,
  loading: false,
  showConfetti: false,
  postLoginAction: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setChatOpen: (state, action) => {
      state.chatOpen = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setShowConfetti: (state, action) => {
      state.showConfetti = action.payload;
    },
    setPostLoginAction: (state, action) => {
      state.postLoginAction = action.payload;
    }
  }
});

export const {
  toggleDarkMode,
  setChatOpen,
  setModalOpen,
  setLoading,
  setShowConfetti,
  setPostLoginAction
} = uiSlice.actions;

export default uiSlice.reducer;
