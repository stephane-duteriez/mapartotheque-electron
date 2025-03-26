import { Tune } from "../types";
import { pdfHeader } from "./resources/pdfHeader";
import { pngHeaderPlain } from "./resources/pngHeaderPlain";

export const getLilypondParams = (tune: Partial<Tune>) => {
	const { name, lilypondText, lilypondChords, category } = tune;

	return {
		lilypond: `title = "${name}"
\\header {
	title = \\title
}
tune = ${lilypondText}
chords_tune = \\chords { ${lilypondChords ?? ""} }`,
		pdfHeader: pdfHeader.replace("$category$", category?.name ?? ""),
		pngHeader: pngHeaderPlain,
	};
};
