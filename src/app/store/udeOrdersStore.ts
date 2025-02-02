import { Order, OrderList } from '@core/api/interfaces/order.model';
import { OrdersApi } from '@core/api/orders/orders.api';
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
