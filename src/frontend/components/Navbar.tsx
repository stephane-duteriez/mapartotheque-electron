import { Alignment, Button, Navbar as BlueprintNavbar } from "@blueprintjs/core";
import { useDispatchUi } from "../cors/domaine/ui/useDispatchUi";

export const Navbar = () => {
	const { showCategories, showTunes, showHome } = useDispatchUi();
	return (
		<BlueprintNavbar>
			<BlueprintNavbar.Group align={Alignment.LEFT} >
				<BlueprintNavbar.Heading>Ma partotheque </BlueprintNavbar.Heading>
				< BlueprintNavbar.Divider />
				<Button className="bp5-minimal" icon="home" text="Home" onClick={showHome} />
				<Button className="bp5-minimal" icon="home" text="Categories" onClick={showCategories} />
				<Button className="bp5-minimal" icon="document" text="Tunes" onClick={showTunes} />
			</BlueprintNavbar.Group>
		</BlueprintNavbar>
	)
}