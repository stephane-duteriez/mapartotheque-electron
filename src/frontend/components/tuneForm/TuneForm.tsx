import { Button, FormGroup, InputGroup, TextArea } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"
import { useState } from "react"
import { usePutTuneMutation, usePostTuneMutation, useDeleteTuneMutation } from "../../cors/api/tunes"
import { useDispatchTune } from "../../cors/domaine/tune/usDispatchTune"
import { useDispatchUi } from "../../cors/domaine/ui/useDispatchUi"
import { useSelectorTune } from "../../cors/domaine/tune/useSelectorTune"
import { useGetCategoriesQuery } from "../../cors/api/categories"
import { useUploadFileMutation } from "../../cors/api/storage"
import { Category } from "../../../types/category"
import { categoryRender } from "./categoryRender"
import { generateFileName } from "../../../utils/generateFileName"
import { generatePngLilypond, generateAndUploadPdfLilypond } from "../../../lilypond"

interface Image {
	img: HTMLImageElement
	blob: Blob
}

export const TuneForm = () => {
	const { selectedTune } = useSelectorTune();
	const { updateSelectedTune } = useDispatchTune();
	const [pngLilypond, setPngLilypond] = useState<Image | null>(null);
	const [putTune] = usePutTuneMutation();
	const [postTune] = usePostTuneMutation();
	const [deleteTune] = useDeleteTuneMutation();
	const { showHome } = useDispatchUi();
	const { data: categories } = useGetCategoriesQuery();
	const [uploadFile] = useUploadFileMutation();

	const handleSave = async () => {
		const selectedTuneCopy = { ...selectedTune }
		if (pngLilypond) {
			const formData = new FormData()
			let fileName = decodeURIComponent(selectedTuneCopy.imageUrl?.split("/").pop() ?? "")
			if (!fileName || fileName === "tune.png") {
				fileName = generateFileName({ name: selectedTuneCopy.name ?? "tune", format: "png" })

			}
			formData.append("file", pngLilypond.blob, fileName)
			const { data } = await uploadFile({ file: formData })
			selectedTuneCopy.imageUrl = data?.url
			const { pdfFileName } = await generateAndUploadPdfLilypond(selectedTuneCopy, uploadFile)
			console.log("pdfFileName", pdfFileName)
			selectedTuneCopy.pdfUrl = pdfFileName
		}
		if (selectedTuneCopy) {
			try {
				if (selectedTuneCopy.id) {
					putTune(selectedTuneCopy)
				} else {
					postTune(selectedTuneCopy)
				}
				showHome()
			} catch (error) {
				console.error("Error saving tune", error)
			}
		}
	}
	const handleDelete = () => {
		if (selectedTune?.id) {
			deleteTune(selectedTune.id)
			showHome()
		}
	}

	const generatePdf = async () => {
		if (selectedTune) {
			const image = await generatePngLilypond(selectedTune)
			setPngLilypond(image)
		}
	}

	return (
		<div>
			<div className="flex justify-end flex-gap-1 flex-space-between">
				<h1>Tune</h1>
				<Button onClick={generatePdf} intent="primary">Generate PDF</Button>
			</div>
			<div className="flex flex-row flex-gap-1" >
				<div className="flex-1">
					<div className="flex flex-row flex-gap-1 flex-space-between">
						<FormGroup label="Name" className="flex-1">
							<InputGroup
								id="name"
								placeholder="Name"
								value={selectedTune?.name}
								onChange={(e) => {
									updateSelectedTune({ name: e.target.value })
								}}
							/>
						</FormGroup>
						<FormGroup label="Category" className="flex-1">
							<Select<Category>
								items={categories ?? []}
								itemRenderer={categoryRender}
								onItemSelect={(category) => {
									updateSelectedTune({ category })
								}}
							>
								<Button icon="plus" text={selectedTune?.category?.name ?? "Select a category"} />
							</Select>
						</FormGroup>
					</div>
					<div className="flex flex-row flex-gap-1">
						<FormGroup label="Youtube URL" className="flex-1">
							<InputGroup
								id="youtubeUrl"
								placeholder="Youtube URL"
								value={selectedTune?.youtubeLink}
								onChange={(e) => {
									updateSelectedTune({ youtubeLink: e.target.value })
								}}
							/>
						</FormGroup>
						<FormGroup label="Image URL" className="flex-1">
							<InputGroup
								disabled
								id="imageUrl"
								placeholder="Image URL"
								value={selectedTune?.imageUrl}
								onChange={(e) => {
									updateSelectedTune({ imageUrl: e.target.value })
								}}
							/>
						</FormGroup>
						<FormGroup label="PDF URL" className="flex-1">
							<InputGroup
								disabled
								id="pdfUrl"
								placeholder="PDF URL"
								value={selectedTune?.pdfUrl}
								onChange={(e) => {
									updateSelectedTune({ pdfUrl: e.target.value })
								}}
							/>
						</FormGroup>
					</div>
					<div className="flex flex-row flex-gap-1">
						<FormGroup label="Lilypond Text" className="flex-1">
							<TextArea
								id="lilypondText"
								placeholder="Lilypond Text"
								value={selectedTune?.lilypondText}
								onChange={(e) => {
									updateSelectedTune({ lilypondText: e.target.value })
								}}
								fill
								autoResize
							/>
						</FormGroup>
						<FormGroup label="Lilypond Chords" className="flex-1">
							<TextArea
								id="lilypondChords"
								placeholder="Lilypond Chords"
								value={selectedTune?.lilypondChords}
								onChange={(e) => {
									updateSelectedTune({ lilypondChords: e.target.value })
								}}
								fill
								autoResize
							/>
						</FormGroup>
					</div>
				</div>
				<div className="flex-1">
					{pngLilypond && (
						<img src={pngLilypond?.img.src ?? ""} alt="Tune" className="png-lilypond" />
					)}
					{!pngLilypond && selectedTune?.imageUrl && (
						<img src={selectedTune?.imageUrl} alt="Tune" className="png-lilypond" />
					)}
				</div>
			</div>
			<div className="flex justify-end flex-gap-1 flex-space-between">
				<Button onClick={handleSave} intent="primary">Save</Button>
				<Button onClick={handleDelete} disabled={!selectedTune?.id} intent="danger">Delete</Button>
			</div>
		</div >
	)
}