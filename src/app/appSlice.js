import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  breadCrumbItems: [],
  modalVisibility: false,
  modalTitle: "",
  modalFooter: "",
  modalContent: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateBreadcrumbs: (state, action) => {
      state.breadCrumbItems = action.payload;
    },
    updateModal: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.modalVisibility = true;
      state = { ...state, ...action.payload };
      console.log(state);
      return state;
    },
    cancelModal: (state) => {
      state.modalVisibility = false;
      state.modalTitle = "";
      state.modalFooter = "";
      state.modalContent = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateIsLoading, updateBreadcrumbs, updateModal, cancelModal } =
  appSlice.actions;

export default appSlice.reducer;
