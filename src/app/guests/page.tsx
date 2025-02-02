'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash } from 'lucide-react';

import ConfirmModal from '../components/ConfirmModal';
import toast from 'react-hot-toast';
import { GuestsApi } from '@core/api/guests.api';
import { useGuestsStore } from '../store/useGuestsStore';
import { Guest } from '@core/interfaces/guest.model';


export default function GuestsPage() {
	const { guests, fetchGuests, addGuest, removeGuest } = useGuestsStore();
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [guestToDelete, setGuestToDelete] = useState<number | null>(null);

	useEffect(() => {
		fetchGuests().finally(() => setLoading(false));
	}, [fetchGuests]);

	const handleDelete = (guestId: number) => {
		setGuestToDelete(guestId);
		setIsModalOpen(true);
	};

	const confirmDelete = async () => {
		if (!guestToDelete) return;

		try {
			await GuestsApi.deleteGuest(guestToDelete);
			removeGuest(guestToDelete);
			toast.success('Convidado removido com sucesso!');
		} catch (error) {
			toast.error('Erro ao remover convidado.');
			console.error('Erro ao remover convidado:', error);
		} finally {
			setIsModalOpen(false);
			setGuestToDelete(null);
		}
	};

	const handleAddGuest = async () => {
		const name = prompt('Nome do convidado:');
		if (!name) return;

		try {
			const newGuest = await GuestsApi.createGuest({ name } as Guest);
			addGuest(newGuest);
			toast.success('Convidado adicionado com sucesso!');
		} catch (error) {
			toast.error('Erro ao adicionar convidado.');
			console.error('Erro ao adicionar convidado:', error);
		}
	};

	return (
		<div className='mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg'>
			<h1 className='mb-4 text-2xl font-bold text-gray-800'>Gerenciar Convidados</h1>

			{loading ? (
				<p className='text-center text-gray-500'>Carregando convidados...</p>
			) : guests.length === 0 ? (
				<p className='text-center text-gray-500'>Nenhum convidado cadastrado.</p>
			) : (
				<ul className='list-inside list-disc text-gray-800'>
					{guests.map((guest) => (
						<li key={guest.id} className='flex justify-between items-center py-2 border-b'>
							<span>{guest.name}</span>
							<button
								className='text-red-500 hover:text-red-700'
								onClick={() => handleDelete(guest.id)}
							>
								<Trash size={18} />
							</button>
						</li>
					))}
				</ul>
			)}

			<button className='btn btn-primary mt-4 flex items-center gap-2' onClick={handleAddGuest}>
				<Plus size={20} /> Adicionar Convidado
			</button>

			<ConfirmModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={confirmDelete}
				title='Remover Convidado'
				message='Tem certeza que deseja remover este convidado?'
			/>
		</div>
	);
}
