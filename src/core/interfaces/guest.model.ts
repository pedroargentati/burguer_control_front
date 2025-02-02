import { Page } from "../../interfaces/page.mode";

export interface Guest {
	id: number;
	name: string;
}

export interface GuestList {
	content: Guest[];
	page: Page;
}
