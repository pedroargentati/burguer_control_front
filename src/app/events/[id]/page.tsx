'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { EventsApi } from '@core/api/orders/events.api';
import { Utils } from '../../utils/utils';
import { Event } from '@core/api/interfaces/event.model';
import toast, { Toaster } from 'react-hot-toast';

export default function EditEventPage() {
	const router = useRouter();
	const { id } = useParams();
	const [event, setEvent] = useState({ name: '', eventDate: '' });
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (!id) return;

		const fetchEvent = async () => {
			try {
				const data: Event = await EventsApi.getEventById(Number(id));
				setEvent({ name: data.name, eventDate: Utils.getISODate(Utils.getFormattedDate(data.eventDate)) });
			} catch (error) {
				toast.error('Erro ao buscar evento. Tente novamente mais tarde.', { duration: 5000 });
				console.error('Erro ao buscar evento:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvent();
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			await EventsApi.updateEvent({ ...event, id: Number(id) } as Event);
			setTimeout(() => router.push('/events'), 1000);
			toast.success('Evento atualizado com sucesso!', { duration: 5000 });
		} catch (error) {
			toast.error('Erro ao atualizar evento. Verifique os dados e tente novamente.', { duration: 5000 });
			console.error('Erro ao atualizar evento:', error);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return <p className="text-center text-gray-500">Carregando...</p>;
	}

	return (
		<div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
			<Toaster position="top-right" reverseOrder={false} />
			<h1 className="mb-6 text-3xl font-bold text-gray-800">Editar Evento</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-gray-700">Nome do Evento</label>
					<input
						type="text"
						name="name"
						value={event.name}
						onChange={handleChange}
						className="input input-bordered w-full"
						required
					/>
				</div>
				<div>
					<label className="block text-gray-700">Data do Evento</label>
					<input
						type="date"
						name="eventDate"
						value={event.eventDate}
						onChange={handleChange}
						className="input input-bordered w-full"
						required
					/>
				</div>
				<div className="flex justify-between">
					<button type="button" onClick={() => router.push('/events')} className="btn btn-outline">
						Cancelar
					</button>
					<button type="submit" className="btn btn-primary" disabled={saving}>
						{saving ? 'Salvando...' : 'Salvar Alterações'}
					</button>
				</div>
			</form>
		</div>
	);
}
