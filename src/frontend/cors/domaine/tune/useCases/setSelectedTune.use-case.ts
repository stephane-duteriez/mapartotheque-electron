import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { TuneState } from "../tune.type";
import { Tune } from "@/types/tune";

export const setSelectedTune = createAction<Partial<Tune> | null>("tune/setSelectedTune");

export const setSelectedTuneReducer = (state: TuneState, action: PayloadAction<Tune | null>) => {
	state.selectedTune = action.payload;
}
