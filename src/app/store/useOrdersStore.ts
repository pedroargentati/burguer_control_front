import { OrdersApi } from '@core/api/orders.api';
import { Order, OrderList } from '@core/interfaces/order.model';
import { create } from 'zustand';

interface OrdersState {
	orders: Order[];
	fetchOrders: () => Promise<void>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
	orders: [],
	fetchOrders: async () => {
		const data: OrderList = await OrdersApi.getAllOrders();
		set({ orders: data.content });
	},
}));
