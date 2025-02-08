'use client';

import { useEffect, useState } from 'react';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { OrdersApi } from '@core/api/orders.api';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useOrdersStore } from '../../../store/useOrdersStore';
import ConfirmModal from '../../../components/ConfirmModal';


export default function OrdersPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const eventId = Number(params.id);

	const { orders, fetchOrders } = useOrdersStore();
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [orderToDelete, setOrderToDelete] = useState<number | null>(null);

	useEffect(() => {
		fetchOrders(eventId).finally(() => setLoading(false));
	}, [fetchOrders, eventId]);

	const handleDelete = (orderId: number) => {
		setOrderToDelete(orderId);
		setIsModalOpen(true);
	};

	const confirmDelete = async () => {
		if (!orderToDelete) return;

		try {
			await OrdersApi.deleteOrder(orderToDelete);
			useOrdersStore.setState((state) => ({
				orders: state.orders.filter((order) => order.id !== orderToDelete),
			}));
			toast.success('Pedido excluído com sucesso!', { duration: 3000 });
		} catch (error) {
			toast.error('Erro ao excluir pedido. Tente novamente mais tarde.', { duration: 5000 });
			console.error('Erro ao excluir pedido:', error);
		} finally {
			setIsModalOpen(false);
			setOrderToDelete(null);
		}
	};

	return (
		<div className='mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-6 shadow-lg'>
			<Toaster position='top-right' reverseOrder={false} />
			<div className='mb-6 flex items-center justify-between'>
				<h1 className='text-3xl font-bold text-gray-800'>Pedidos do Evento</h1>
				<Link href={`/orders/${eventId}/new`}>
					<button className='btn btn-primary flex items-center gap-2'>
						<Plus size={20} />
						Novo Pedido
					</button>
				</Link>
			</div>

			{loading ? (
				<p className='text-center text-gray-500'>Carregando pedidos...</p>
			) : orders.length === 0 ? (
				<p className='text-center text-gray-500'>Nenhum pedido cadastrado.</p>
			) : (
				<div className='overflow-x-auto'>
					<table className='table w-full rounded-lg border border-gray-300'>
						<thead>
							<tr className='bg-gray-200 text-gray-700'>
								<th className='p-3 text-left'>Pedido</th>
								<th className='p-3 text-left'>Anotações</th>
								<th className='p-3 text-left'>Ações</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.id} className='border-t border-gray-300 hover:bg-gray-100'>
									<td className='p-3 text-gray-800'>{order.personName}</td>
									<td className='p-3 text-gray-800'>{order.notes}</td>
									<td className='flex gap-3 p-3'>
										<button
											className='text-blue-500 hover:text-blue-700'
											onClick={() => router.push(`/events/${eventId}/orders/${order.id}`)}
										>
											<Pencil size={18} />
										</button>
										<button
											className='text-red-500 hover:text-red-700'
											onClick={() => handleDelete(order.id)}
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
				title='Excluir Pedido'
				message='Tem certeza que deseja excluir este pedido?'
			/>
		</div>
	);
}
