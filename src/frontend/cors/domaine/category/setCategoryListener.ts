import { ListenerEffectAPI } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { showCategories, showHome } from "../ui/ui.slice";
import { setSelectedCategory } from "./useCases/setSelectedCategory.use-case";

export const setCategoryListener = {
	actionCreator: setSelectedCategory,
	effect: (category: ReturnType<typeof setSelectedCategory>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
		if (category) {
			listenerApi.dispatch(showCategories());
		} else {
			listenerApi.dispatch(showHome());
		}
	}
}
