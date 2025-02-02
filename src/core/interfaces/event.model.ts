import { Page } from "./page.mode";

export interface Event {
	id: number;
	name: string;
	eventDate: string;
}

export interface EventList {
	content: Event[];
	page: Page
}
