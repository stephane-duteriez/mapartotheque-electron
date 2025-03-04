import { ListenerEffectAPI } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { showTunes, showHome } from "../ui/ui.slice";
import { setSelectedTune } from "./useCases/setSelectedTune.use-case";

export const setTuneListener = {
	actionCreator: setSelectedTune,
	effect: (tune: ReturnType<typeof setSelectedTune>, listenerApi: ListenerEffectAPI<RootState, AppDispatch>) => {
		if (tune) {
			listenerApi.dispatch(showTunes());
		} else {
			listenerApi.dispatch(showHome());
		}
	}
}

