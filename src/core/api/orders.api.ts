import { Order, OrderList } from "@core/interfaces/order.model";
import { CoreApi } from "./core.api";


export class OrdersApi {

	private static readonly BASE_URL = 'http://localhost:8080/order';

	public static async getAllOrders(): Promise<OrderList> {
		return await CoreApi.get<OrderList>(OrdersApi.BASE_URL);
	}

	public static getOrdersByEvent(eventId: number): Promise<Order> {
		return CoreApi.get<Order>(`${OrdersApi.BASE_URL}/event/${eventId}`);
	}

	public static async createOrder(order: Order): Promise<Order> {
		return await CoreApi.post<Order>(OrdersApi.BASE_URL, order);
	}

	public static async deleteOrder(orderId: number): Promise<void> {
		await CoreApi.delete(`${OrdersApi.BASE_URL}/${orderId}`);
	}

}
