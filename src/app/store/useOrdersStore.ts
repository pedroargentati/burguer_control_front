import { OrdersApi } from '@core/api/orders.api';
import { Order } from '@core/interfaces/order.model';
import { create } from 'zustand';

interface OrdersState {
	orders: Order[];
	fetchOrders: (eventId: number) => Promise<void>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
	orders: [],
	fetchOrders: async (eventId: number) => {
		const data = await OrdersApi.getOrdersByEvent(eventId);
		console.log(data);
		if (data?.['content']) {
			set({ orders: data['content'] });
		} else {
			set({ orders: [data] });
		}
	},
}));
