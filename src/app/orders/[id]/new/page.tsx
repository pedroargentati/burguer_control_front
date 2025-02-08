'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';
import { OrdersApi } from '@core/api/orders.api';
import { PersonApi } from '@core/api/person.api';
import { Order } from '@core/interfaces/order.model';
import { Person } from '@core/interfaces/person.model';

interface PersonOption {
	value: number;
	label: string;
}

export default function NewOrderPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const eventId = Number(params.id);

	const [formData, setFormData] = useState({
		personId: '',
		meatDoneness: '',
		notes: '',
		status: 'PENDING',
	});
	const [loading, setLoading] = useState(false);
	const [persons, setPersons] = useState<PersonOption[]>([]);

	// Buscar lista de pessoas da API
	useEffect(() => {
		const fetchPersons = async () => {
			try {
				const data = await PersonApi.getAllPersons();
				setPersons(data?.content?.map((person: Person) => ({ value: person.id, label: person.name })));
			} catch (error) {
				console.error('Erro ao buscar pessoas:', error);
				toast.error('Erro ao carregar lista de pessoas.');
			}
		};

		fetchPersons();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePersonChange = (selectedOption: PersonOption | null) => {
		setFormData((prev) => ({ ...prev, personId: selectedOption ? selectedOption.value.toString() : '' }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await OrdersApi.createOrder({ ...formData, eventId } as unknown as Order);
			toast.success('Pedido cadastrado com sucesso!', { duration: 3000 });
			setTimeout(() => router.push(`/events/${eventId}/orders`), 1000);
		} catch (error) {
			toast.error('Erro ao cadastrar pedido. Tente novamente.', { duration: 5000 });
			console.error('Erro ao cadastrar pedido:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-6 shadow-lg'>
			<Toaster position='top-right' reverseOrder={false} />
			<h1 className='mb-6 text-3xl font-bold text-gray-800'>Novo Pedido</h1>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-gray-700'>Pessoa</label>
					<Select
						options={persons}
						onChange={handlePersonChange}
						placeholder='Selecione uma pessoa...'
						aria-errormessage='Selecione uma pessoa'
						isSearchable
						className='text-black'
					/>
				</div>

				<div>
					<label className='block text-gray-700'>Ponto da Carne</label>
					<select
						name='meatDoneness'
						value={formData.meatDoneness}
						onChange={handleChange}
						className='select select-bordered w-full'
						required
					>
						<option value=''>Selecione...</option>
						<option value='MAL_PASSADO'>Mal Passado</option>
						<option value='AO_PONTO'>Ao Ponto</option>
						<option value='BEM_PASSADO'>Bem Passado</option>
					</select>
				</div>

				<div>
					<label className='block text-gray-700'>Observações</label>
					<textarea
						name='notes'
						value={formData.notes}
						onChange={handleChange}
						className='textarea textarea-bordered w-full'
					/>
				</div>

				<button type='submit' className='btn btn-primary w-full' disabled={loading}>
					{loading ? 'Salvando...' : 'Salvar Pedido'}
				</button>
			</form>
		</div>
	);
}
