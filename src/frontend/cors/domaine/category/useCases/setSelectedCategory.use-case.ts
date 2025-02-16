import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../../../types";
import { CategoryState } from "../category.type";

export const setSelectedCategory = createAction<Partial<Category> | null>("category/setSelectedCategory");

export const setSelectedCategoryReducer = (state: CategoryState, action: PayloadAction<Category | null>) => {
	state.selectedCategory = action.payload;
}
