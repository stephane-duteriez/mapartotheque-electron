import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TuneState } from "./tune.type";
import { setSelectedTuneReducer } from "./useCases/setSelectedTune.use-case";
import { Tune } from "@/types/tune";

const initialState: TuneState = {
	selectedTune: null,
}

const tuneSlice = createSlice({
	name: "tune",
	initialState,
	reducers: {
		setSelectedTune: setSelectedTuneReducer,
		updateSelectedTune: (state, action: PayloadAction<Partial<Tune>>) => {
			state.selectedTune = { ...state.selectedTune, ...action.payload };
		},
	},
});

export const { updateSelectedTune } = tuneSlice.actions;
export default tuneSlice.reducer;
