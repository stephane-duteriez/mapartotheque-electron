import { generateFileName } from "../utils/generateFileName";
import { Tune } from "../types/tune";
import { getLilypondParams } from "./getLilyPondParams";
import type { UploadFileMutation } from "../frontend/cors/api/storage";

export const generateAndUploadPdfLilypond = async (tune: Partial<Tune>, uploadFile: UploadFileMutation): Promise<{ pdfFileName: string }> => {
	const params = getLilypondParams(tune);

	let contents = "\\version \"2.24.3\"\n"
	contents += params.lilypond
	contents += params.pdfHeader

	const tmpLyFileName = "tmp.ly"
	const tmpPdfFileName = "tmp"

	await window.backend.invoke("writeToFile", { fileName: tmpLyFileName, contents });

	const consoleParams = {
		params: " -ddelete-intermediate-files -o, --output=***outputFile*** ***inputFile***",
		lilypondFile: tmpLyFileName,
		outputFile: tmpPdfFileName
	}

	await window.backend.invoke("generateLilypond", consoleParams)

	const pdfFile = await window.backend.invoke("readFromFile", `${tmpPdfFileName}.pdf`)
	const blob = new Blob([pdfFile], { type: "application/pdf" })

	const pdfFileName = tune.pdfUrl ? decodeURIComponent(tune.pdfUrl.split("/").pop() ?? "") : generateFileName({ name: tune.name ?? "tune", format: "pdf" })

	const formData = new FormData()
	formData.append("file", blob, pdfFileName)
	const { data } = await uploadFile({ file: formData })

	if (!data?.url) {
		throw new Error("Failed to upload PDF file")
	}

	return { pdfFileName: data.url }
};