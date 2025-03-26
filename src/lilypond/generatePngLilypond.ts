import { Tune } from "../types/tune";
import { getLilypondParams } from "./getLilyPondParams";

export const generatePngLilypond = async (tune: Partial<Tune>): Promise<{ img: HTMLImageElement, blob: Blob }> => {
	const params = getLilypondParams(tune);

	let contents = "\\version \"2.24.3\"\n"
	contents += params.lilypond
	contents += params.pngHeader

	const tmpLyFileName = "tmp.ly"
	const tmpPngFileName = "tmp"

	await window.backend.invoke("writeToFile", { fileName: tmpLyFileName, contents });

	const consoleParams = {
		params: " -ddelete-intermediate-files --png -dbackend=eps -daux-files=#f -dresolution=200 -danti-alias-factor=1 -o, --output=***outputFile*** ***inputFile***",
		lilypondFile: tmpLyFileName,
		outputFile: tmpPngFileName
	}

	await window.backend.invoke("generateLilypond", consoleParams)

	const pngFile = await window.backend.invoke("readFromFile", `${tmpPngFileName}.png`)
	const blob = new Blob([pngFile], { type: "image/png" })
	const url = URL.createObjectURL(blob)
	const img = new Image()
	img.src = url
	return { img, blob }
};
