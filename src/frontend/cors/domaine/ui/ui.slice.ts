import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "../../../constants/uiState";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		uiState: UiState.SHOW_HOME,
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
		setSelectedTune: (state, action) => {
			state.selectedTune = action.payload;
			state.uiState = UiState.SHOW_TUNES;
		},
	},
});

export const { showCategories, showTunes, showHome, setSelectedTune } = uiSlice.actions;
export default uiSlice.reducer;