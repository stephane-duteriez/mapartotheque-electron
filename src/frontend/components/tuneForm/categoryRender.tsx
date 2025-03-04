import { MenuItem } from "@blueprintjs/core"
import { Category } from "@/types/category"
import { MouseEventHandler } from "react"

export const categoryRender = (category: Category, { handleClick }: { handleClick: MouseEventHandler<HTMLElement> }) => {
	return <MenuItem text={category.name} key={category.id} onClick={handleClick} />
}