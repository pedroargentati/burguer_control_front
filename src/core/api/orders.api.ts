import { CoreApi } from "../core.api";
import { Order, OrderList } from "../../interfaces/order.model";

export class OrdersApi {
	private static readonly BASE_URL = 'http://localhost:8080/order';

	public static async getAllOrders(): Promise<OrderList> {
		return await CoreApi.get<OrderList>(OrdersApi.BASE_URL);
	}

	public static async createOrder(order: Order): Promise<Order> {
		return await CoreApi.post<Order>(OrdersApi.BASE_URL, order);
	}

}
