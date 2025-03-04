import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../../../types";
import { CategoryState } from "./category.type";
import { setSelectedCategoryReducer } from "./useCases/setSelectedCategory.use-case";

const initialState: CategoryState = {
	selectedCategory: null,
}

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		setSelectedCategory: setSelectedCategoryReducer,
		updateSelectedCategory: (state, action: PayloadAction<Partial<Category>>) => {
			state.selectedCategory = { ...state.selectedCategory, ...action.payload };
		},
	},
});

export const { updateSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;


