'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Event } from '@core/interfaces/event.model';
import toast, { Toaster } from 'react-hot-toast';
import { Utils } from '../../utils/utils';
import { EventsApi } from '@core/api/events.api';

export default function NewEventPage() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [eventDate, setEventDate] = useState(Utils.getISODateFromDate(new Date()));
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleCreateEvent = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			await EventsApi.createEvent({ name, eventDate } as Event);

			setTimeout(() => router.push('/events'), 1000);
			toast.success('Evento criado com sucesso!', { duration: 5000 });
		} catch (err) {
			console.log(err);
			toast.error('Erro ao criar evento. Verifique os dados e tente novamente.', { duration: 5000 });
			setError('Não foi possível criar o evento.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='mx-auto mt-10 max-w-lg rounded-2xl bg-white p-6 shadow-lg'>
			<Toaster position="top-right" reverseOrder={false} />
			<h1 className='mb-6 text-3xl font-bold text-gray-800'>Criar Novo Evento</h1>

			<form onSubmit={handleCreateEvent} className='space-y-4'>
				<div>
					<label className='block font-medium text-gray-700'>Nome do Evento</label>
					<input
						type='text'
						className='input input-bordered w-full bg-gray-700'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						placeholder='Informe o nome do evento...'
					/>
				</div>

				<div>
					<label className='block font-medium text-gray-700'>Data do Evento</label>
					<input
						type='date'
						className='input input-bordered w-full bg-gray-700'
						value={eventDate}
						onChange={(e) => setEventDate(e.target.value)}
						required
					/>
				</div>

				{error && <p className='text-red-500'>{error}</p>}

				<button type='submit' className='btn btn-primary w-full' disabled={loading}>
					{loading ? 'Criando...' : 'Criar Evento'}
				</button>
			</form>
		</div>
	);
}
