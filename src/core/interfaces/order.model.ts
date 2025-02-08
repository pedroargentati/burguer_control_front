import { Page } from "./page.mode";

export interface Order {
	id: number;
	eventId?: number;
	personName: string;
	eventName: string;
	meatDoneness: string;
	notes?: string;
}

export interface OrderList {
	content: Order[];
	page: Page
}
