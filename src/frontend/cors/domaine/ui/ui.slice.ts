import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "../../../constants/uiState";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		uiState: UiState.SHOW_HOME,
		selectedCategory: null,
		selectedTune: null,
	},
	reducers: {
		showCategories: (state) => {
			state.uiState = UiState.SHOW_CATEGORIES;
		},
		showTunes: (state) => {
			state.uiState = UiState.SHOW_TUNES;
		},
		showHome: (state) => {
			state.uiState = UiState.SHOW_HOME;
		},
		setSelectedCategory: (state, action) => {
			state.selectedCategory = action.payload;
			state.uiState = UiState.SHOW_TUNES;
		},
		setSelectedTune: (state, action) => {
			state.selectedTune = action.payload;
			state.uiState = UiState.SHOW_TUNES;
		},
	},
});

export const { showCategories, showTunes, showHome, setSelectedCategory, setSelectedTune } = uiSlice.actions;
export default uiSlice.reducer;
