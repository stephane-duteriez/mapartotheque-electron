import { Category } from "../../../../types";

export type CategoryState = {
	selectedCategory: Partial<Category> | null;
};