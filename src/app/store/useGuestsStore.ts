import { GuestsApi } from '@core/api/guests.api';
import { GuestList } from '@core/interfaces/guest.model';
import { create } from 'zustand';

type Guest = {
	id: number;
	name: string;
};

type GuestsStore = {
	guests: Guest[];
	fetchGuests: () => Promise<void>;
	addGuest: (guest: Guest) => void;
	removeGuest: (guestId: number) => void;
};

export const useGuestsStore = create<GuestsStore>((set) => ({
	guests: [],
	fetchGuests: async () => {
		try {
			const guests: GuestList = await GuestsApi.getAllGuests();
			set({ guests: guests.content });
		} catch (error) {
			console.error('Erro ao buscar convidados:', error);
		}
	},
	addGuest: (guest) => set((state) => ({ guests: [...state.guests, guest] })),
	removeGuest: (guestId) =>
		set((state) => ({
			guests: state.guests.filter((guest) => guest.id !== guestId),
		})),
}));
