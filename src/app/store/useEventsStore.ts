import { create } from 'zustand';

interface Event {
	id: number;
	name: string;
	eventDate: string;
}

interface EventsStore {
	events: Event[];
	fetchEvents: () => Promise<void>;
}

export const useEventsStore = create<EventsStore>((set) => ({
	events: [],
	fetchEvents: async () => {
		try {
			const response = await fetch('http://localhost:8080/event');
			if (!response.ok) throw new Error('Erro ao buscar eventos');

			const data = await response.json();
			set({ events: data.content });
		} catch (error) {
			console.error('Erro ao buscar eventos:', error);
		}
	},
}));
