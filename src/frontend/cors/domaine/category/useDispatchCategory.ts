import { useDispatch } from "react-redux";
import {
	updateSelectedCategory as updateSelectedCategoryAction,
} from "./category.slice";
import { setSelectedCategory as setSelectedCategoryAction } from "./useCases/setSelectedCategory.use-case";
import { Category } from "../../../types";

export const useDispatchCategory = () => {
	const dispatch = useDispatch();

	const setSelectedCategory = (category: Partial<Category>) => dispatch(setSelectedCategoryAction(category));
	const updateSelectedCategory = (category: Partial<Category>) => dispatch(updateSelectedCategoryAction(category));
	return { setSelectedCategory, updateSelectedCategory };
}
