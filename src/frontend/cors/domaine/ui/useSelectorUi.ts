import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const selectUi = (state: RootState) => state.ui;

export const selectUiState = createSelector(selectUi, (ui) => ui.uiState);

export const useSelectorUi = () => {
	const uiState = useSelector(selectUiState);

	return uiState;
}