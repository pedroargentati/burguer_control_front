'use client';

import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useEventsStore } from '../store/useEventsStore';
import { Utils } from '../utils/utils';
import Link from 'next/link';
import ConfirmModal from '../components/ConfirmModal';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { EventsApi } from '@core/api/events.api';

export default function EventsPage() {
	const router = useRouter();

	const { events, fetchEvents } = useEventsStore();
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [eventToDelete, setEventToDelete] = useState<number | null>(null);

	useEffect(() => {
		fetchEvents().finally(() => setLoading(false));
	}, [fetchEvents]);

	const handleDelete = (eventId: number) => {
		setEventToDelete(eventId);
		setIsModalOpen(true);
	};

	const confirmDelete = async () => {
		if (!eventToDelete) return;

		try {
			await EventsApi.deleteEvent(eventToDelete);

			useEventsStore.setState((state) => ({
				events: state.events.filter((event) => event.id !== eventToDelete),
			}));
			toast.success('Evento excluído com sucesso!', { duration: 3000 });

		} catch (error) {
			toast.error('Erro ao excluir evento. Tente novamente mais tarde.', { duration: 5000 });
			console.error('Erro ao excluir evento:', error);
		} finally {
			setIsModalOpen(false);
			setEventToDelete(null);
		}
	};

	return (
		<div className='mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg'>
			<Toaster position="top-right" reverseOrder={false} />
			<div className='mb-6 flex items-center justify-between'>
				<h1 className='text-3xl font-bold text-gray-800'>Eventos</h1>
				<Link href='/events/new'>
					<button className='btn btn-primary flex items-center gap-2'>
						<Plus size={20} />
						Criar Evento
					</button>
				</Link>
			</div>

			{loading ? (
				<p className='text-center text-gray-500'>Carregando eventos...</p>
			) : events.length === 0 ? (
				<p className='text-center text-gray-500'>Nenhum evento cadastrado.</p>
			) : (
				<div className='overflow-x-auto'>
					<table className='table w-full rounded-lg border border-gray-300'>
						<thead>
							<tr className='bg-gray-200 text-gray-700'>
								<th className='p-3 text-left'>Nome do Evento</th>
								<th className='p-3 text-left'>Data</th>
								<th className='p-3 text-left'>Ações</th>
							</tr>
						</thead>
						<tbody>
							{events.map((event) => (
								<tr key={event.id} className='border-t border-gray-300 hover:bg-gray-100'>
									<td className='p-3 text-gray-800'>{event.name}</td>
									<td className='p-3 text-gray-800'>{Utils.getFormattedDate(event.eventDate)}</td>
									<td className='flex gap-3 p-3'>
										<button
											className='text-blue-500 hover:text-blue-700'
											onClick={() => router.push(`/events/${event.id}`)}
										>
											<Pencil size={18} />
										</button>
										<button
											className='text-red-500 hover:text-red-700'
											onClick={() => handleDelete(event.id)}
										>
											<Trash size={18} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			<ConfirmModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={confirmDelete}
				title='Excluir Evento'
				message='Tem certeza que deseja excluir este evento?'
			/>
		</div>
	);
}
