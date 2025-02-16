import { Button, FormGroup, InputGroup } from "@blueprintjs/core"
import { useSelectorCategory } from "../cors/domaine/category/useSelectorCategory";
import { useDispatchCategory } from "../cors/domaine/category/useDispatchCategory";
import { useDeleteCategoryMutation, usePostCategoryMutation, usePutCategoryMutation } from "../cors/api/categories";
import { useDispatchUi } from "../cors/domaine/ui/useDispatchUi";

export const CategoryForm = () => {
	const { selectedCategory } = useSelectorCategory();
	const { updateSelectedCategory } = useDispatchCategory();
	const [putCategory] = usePutCategoryMutation();
	const [postCategory] = usePostCategoryMutation();
	const [deleteCategory] = useDeleteCategoryMutation();
	const { showHome } = useDispatchUi();
	const handleSave = () => {
		if (selectedCategory) {
			try {
				if (selectedCategory.id) {
					putCategory(selectedCategory)
				} else {
					postCategory(selectedCategory)
				}
				showHome()
			} catch (error) {
				console.error("Error saving category", error)
			}
		}
	}
	const handleDelete = () => {
		if (selectedCategory?.id) {
			deleteCategory(selectedCategory.id)
			showHome()
		}
	}

	return (
		<div>
			<h1>Categories</h1>
			<FormGroup label="Name">
				<InputGroup
					id="name"
					placeholder="Name"
					value={selectedCategory?.name}
					onChange={(e) => {
						updateSelectedCategory({ name: e.target.value })
					}}
				/>
			</FormGroup>

			<div className="flex justify-end flex-gap-1 flex-space-between">
				<Button onClick={handleSave} intent="primary">Save</Button>
				<Button onClick={handleDelete} disabled={!selectedCategory?.id} intent="danger">Delete</Button>
			</div>
		</div>
	)
}