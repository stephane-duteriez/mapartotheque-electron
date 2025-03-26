import { UiState } from "../constants/uiState";
import { useSelectorUi } from "../cors/domaine/ui/useSelectorUi";
import { Home } from "./Home";
import { CategoryForm } from "./CategoryForm";
import { TuneForm } from "./tuneForm/TuneForm";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Login from "./Login";

export const Body = () => {
	const uiState = useSelectorUi();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user: User | null) => {
			if (user) {
				// @ts-expect-error it does exist?
				const accessToken = user.accessToken;
				localStorage.setItem("token", accessToken)
				setUser(user)
			} else {
				console.log("user is logged out")
			}
		});

	}, [])

	return (
		<div>
			{!user && <Login />}
			{user && uiState === UiState.SHOW_HOME && <Home />}
			{user && uiState === UiState.SHOW_CATEGORIES && <CategoryForm />}
			{user && uiState === UiState.SHOW_TUNES && <TuneForm />}
		</div>
	)
}