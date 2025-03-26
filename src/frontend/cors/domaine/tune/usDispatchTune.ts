import { useDispatch } from "react-redux";
import { Tune } from "../../../../types/tune";
import { setSelectedTune as setSelectedTuneAction } from "./useCases/setSelectedTune.use-case";
import { updateSelectedTune as updateSelectedTuneAction } from "./tune.slice";

export const useDispatchTune = () => {
	const dispatch = useDispatch();

	const setSelectedTune = (tune: Partial<Tune>) => dispatch(setSelectedTuneAction(tune));
	const updateSelectedTune = (tune: Partial<Tune>) => dispatch(updateSelectedTuneAction(tune));
	return { setSelectedTune, updateSelectedTune };
}
