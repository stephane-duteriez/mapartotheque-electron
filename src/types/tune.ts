import { Category } from "./category";

export type Tune = {
	id: string;
	name: string;
	category: Category;
	youtubeLink: string;
	lilypondText: string;
	lilypondChords: string;
	imageUrl: string;
	pdfUrl: string;
}

