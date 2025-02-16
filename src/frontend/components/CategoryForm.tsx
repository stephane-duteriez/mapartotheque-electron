import { FormGroup, InputGroup } from "@blueprintjs/core"

export const CategoryForm = () => {

	return (
		<div>
			<h1>Categories</h1>
			<FormGroup label="Name">
				<InputGroup id="name" placeholder="Name" />
			</FormGroup>
		</div>
	)
}