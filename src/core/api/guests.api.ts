import { Guest, GuestList } from "@core/interfaces/guest.model";
import { CoreApi } from "./core.api";

export class GuestsApi {
	private static readonly BASE_URL = 'http://localhost:8080/person';

	public static async getAllGuests(): Promise<GuestList> {
		return await CoreApi.get<GuestList>(GuestsApi.BASE_URL) || { content: [] } as GuestList;
	}

	public static async createGuest(Guests: Guest): Promise<Guest> {
		return await CoreApi.post<Guest>(GuestsApi.BASE_URL, Guests);
	}

	public static async getGuestById(id: number): Promise<Guest> {
		return await CoreApi.get<Guest>(`${GuestsApi.BASE_URL}/${id}`);
	}

	public static async updateGuest(Guest: Guest): Promise<Guest> {
		return await CoreApi.put<Guest>(`${GuestsApi.BASE_URL}`, Guest);
	}

	public static async deleteGuest(id: number): Promise<void> {
		await CoreApi.delete(`${GuestsApi.BASE_URL}/${id}`);
	}

}
