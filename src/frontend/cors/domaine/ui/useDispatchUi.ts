import { useDispatch } from "react-redux";
import {
	showCategories as showCategoriesAction,
	showTunes as showTunesAction,
	showHome as showHomeAction,
	setSelectedCategory as setSelectedCategoryAction,
	setSelectedTune as setSelectedTuneAction,
} from "./ui.slice";
import { Category, Tune } from "../../../types";

export const useDispatchUi = () => {
	const dispatch = useDispatch();

	const showCategories = () => dispatch(showCategoriesAction());
	const showTunes = () => dispatch(showTunesAction());
	const showHome = () => dispatch(showHomeAction());
	const setSelectedCategory = (category: Category) => dispatch(setSelectedCategoryAction(category));
	const setSelectedTune = (tune: Tune) => dispatch(setSelectedTuneAction(tune));

	return { showCategories, showTunes, showHome, setSelectedCategory, setSelectedTune };
}
