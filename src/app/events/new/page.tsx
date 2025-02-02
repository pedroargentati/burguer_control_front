'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewEventPage() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleCreateEvent = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await fetch('http://localhost:8080/event', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, eventDate }),
			});

			if (!response.ok) {
				throw new Error('Erro ao criar evento.');
			}

			router.push('/events');
		} catch (err) {
			console.log(err);
			setError('Não foi possível criar o evento.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='mx-auto mt-10 max-w-lg rounded-2xl bg-white p-6 shadow-lg'>
			<h1 className='mb-6 text-3xl font-bold text-gray-800'>Criar Novo Evento</h1>

			<form onSubmit={handleCreateEvent} className='space-y-4'>
				<div>
					<label className='block font-medium text-gray-700'>Nome do Evento</label>
					<input
						type='text'
						className='input input-bordered w-full'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

				<div>
					<label className='block font-medium text-gray-700'>Data do Evento</label>
					<input
						type='date'
						className='input input-bordered w-full'
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
