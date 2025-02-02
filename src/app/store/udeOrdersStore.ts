import { create } from 'zustand';

interface Order {
	id: number;
	personName: string;
	eventName: string;
	meatDoneness: string;
	notes?: string;
}

interface OrdersState {
	orders: Order[];
	fetchOrders: () => Promise<void>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
	orders: [],
	fetchOrders: async () => {
		const res = await fetch('http://localhost:8080/orders');
		const data = await res.json();
		set({ orders: data });
	},
}));
