import { Event, EventList } from '@core/api/interfaces/event.model';
import { EventsApi } from '@core/api/orders/events.api';
import { create } from 'zustand';

interface EventsStore {
	events: Event[];
	fetchEvents: () => Promise<void>;
}

export const useEventsStore = create<EventsStore>((set) => ({
	events: [],
	fetchEvents: async () => {
		try {
			const data: EventList = await EventsApi.getAllEventss();
			set({ events: data.content });
		} catch (error) {
			console.error('Erro ao buscar eventos:', error);
		}
	},
}));
