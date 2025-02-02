'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useEventsStore } from '../store/useEventsStore';
import { Utils } from '../utils/utils';
import Link from 'next/link';

export default function EventsPage() {
	const { events, fetchEvents } = useEventsStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchEvents().finally(() => setLoading(false));
	}, [fetchEvents]);

	return (
		<div className='mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg'>
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
							</tr>
						</thead>
						<tbody>
							{events.map((event) => (
								<tr key={event.id} className='border-t border-gray-300 hover:bg-gray-100'>
									<td className='p-3 text-gray-800'>{event.name}</td>
									<td className='p-3 text-gray-800'>{Utils.getFormattedDate(event.eventDate)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
