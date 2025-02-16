import { useSelector } from "react-redux";
import { RootState } from "../../store";

const selectCategory = (state: RootState) => state.category;


export const useSelectorCategory = () => {
	const categoryState = useSelector(selectCategory);

	return categoryState;
}
