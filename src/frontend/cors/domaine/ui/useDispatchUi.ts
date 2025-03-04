import { useDispatch } from "react-redux";
import {
	showCategories as showCategoriesAction,
	showTunes as showTunesAction,
	showHome as showHomeAction,
	setSelectedTune as setSelectedTuneAction,
} from "./ui.slice";
import { Tune } from "../../../../types";

export const useDispatchUi = () => {
	const dispatch = useDispatch();

	const showCategories = () => dispatch(showCategoriesAction());
	const showTunes = () => dispatch(showTunesAction());
	const showHome = () => dispatch(showHomeAction());
	const setSelectedTune = (tune: Tune) => dispatch(setSelectedTuneAction(tune));

	return { showCategories, showTunes, showHome, setSelectedTune };
}
