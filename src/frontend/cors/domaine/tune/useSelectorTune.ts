import { useSelector } from "react-redux";
import { RootState } from "../../store";

const selectTune = (state: RootState) => state.tune;

export const useSelectorTune = () => {
	const tuneState = useSelector(selectTune);

	return tuneState;
}
