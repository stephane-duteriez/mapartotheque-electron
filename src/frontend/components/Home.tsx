import { Button, Card, CardList } from "@blueprintjs/core";
import { useGetCategoriesQuery } from "../cors/api/categories";
import { useGetTunesQuery } from "../cors/api/tunes";
import { useState } from "react";
import { Category } from "../../types";
import { useDispatchCategory } from "../cors/domaine/category/useDispatchCategory";
import { useDispatchTune } from "../cors/domaine/tune/usDispatchTune";

export const Home = () => {
	const [selectedCurrentCategory, setSelectedCurrentCategory] = useState<Category | null>(null);
	const { data: categories, error, isLoading } = useGetCategoriesQuery();
	const { data: tunes, error: tunesError, isLoading: tunesLoading } = useGetTunesQuery();
	const { setSelectedCategory } = useDispatchCategory();
	const { setSelectedTune } = useDispatchTune();
	console.log("selectedTune", tunes)
	return (
		<div>
			<h1>Home</h1>
			<div className="flex flex-row margin-1 flex-gap-1">
				<div className="flex-1">
					<Button className="margin-1" icon="plus" onClick={() => setSelectedCategory({ name: "" })} />
					<CardList>
						{isLoading && <p>Loading...</p>}
						{error && <p>Error: something went wrong</p>}
						{!isLoading && <Card
							selected={!selectedCurrentCategory}
							onClick={() => setSelectedCurrentCategory(null)}
						>All categories</Card>}
						{categories?.map((category) => (
							<Card
								key={category.id}
								className="flex flex-row flex-space-between"
								selected={selectedCurrentCategory?.id === category.id}
								onClick={() => setSelectedCurrentCategory(category)}
							>
								<span>
									{category.name}
								</span>
								<Button icon="edit" onClick={() => setSelectedCategory(category)} />
							</Card>
						))}
					</CardList>
				</div>
				<div className="flex-1">
					<Button className="margin-1" icon="plus" onClick={() => setSelectedTune({ name: "" })} />
					<CardList>
						{tunesLoading && <p>Loading...</p>}
						{tunesError && <p>Error: something went wrong</p>}
						{tunes?.filter((tune) => {
							if (selectedCurrentCategory) {
								return tune.category.id === selectedCurrentCategory.id;
							}
							return true;
						}).map((tune) => (
							<Card key={tune.id} className="flex flex-row flex-space-between">
								<span>
									{tune.name}
								</span>
								<Button icon="edit" onClick={() => setSelectedTune(tune)} />
							</Card>
						))}
					</CardList>
				</div>
			</div>
		</div>
	)
}