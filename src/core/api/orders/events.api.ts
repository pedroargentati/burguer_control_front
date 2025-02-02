import { CoreApi } from "../core.api";
import { Event, EventList } from "../interfaces/event.model";

export class EventsApi {
	private static readonly BASE_URL = 'http://localhost:8080/event';

	public static async getAllEventss(): Promise<EventList> {
		return await CoreApi.get<EventList>(EventsApi.BASE_URL) || { content: [] } as EventList;
	}

	public static async createEvent(Events: Event): Promise<Event> {
		return await CoreApi.post<Event>(EventsApi.BASE_URL, Events);
	}

	public static async getEventById(id: number): Promise<Event> {
		return await CoreApi.get<Event>(`${EventsApi.BASE_URL}/${id}`);
	}

	public static async updateEvent(id: number, Events: Event): Promise<Event> {
		return await CoreApi.put<Event>(`${EventsApi.BASE_URL}/${id}`, Events);
	}

	public static async deleteEvent(id: number): Promise<void> {
		await CoreApi.delete(`${EventsApi.BASE_URL}/${id}`);
	}

}
