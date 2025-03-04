import { Tune } from "@/types/tune";

export type TuneState = {
	selectedTune: Partial<Tune> | null;
};