import { Category, Tune } from "../../../types";

export type UiState = {
	showCategories: boolean;
	showTunes: boolean;
	showHome: boolean;
	selectedCategory: Category | null;
	selectedTune: Tune | null;
};
