import { UiState } from "../constants/uiState";
import { useSelectorUi } from "../cors/domaine/ui/useSelectorUi";
import { Home } from "./Home";
import { CategoryForm } from "./CategoryForm";
import { TuneForm } from "./TuneForm";

export const Body = () => {
	const uiState = useSelectorUi();

	return (
		<div>
			{uiState === UiState.SHOW_HOME && <Home />}
			{uiState === UiState.SHOW_CATEGORIES && <CategoryForm />}
			{uiState === UiState.SHOW_TUNES && <TuneForm />}
		</div>
	)
}