import { Page } from "./page.mode";

export interface Person {
	id: number;
	name: string;
}

export interface PersonList {
	content: Person[];
	page: Page
}
