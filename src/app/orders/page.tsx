export default function OrdersPage() {
	return (
		<div>
			<h1 className='mb-4 text-2xl font-bold'>Pedidos</h1>
			<a href='/orders/new' className='btn btn-primary mb-4'>
				Novo Pedido
			</a>
			<ul className='list-inside list-disc'>
				<li>Pedido #1 - João - Ao ponto</li>
				<li>Pedido #2 - Maria - Bem passado</li>
			</ul>
		</div>
	);
}
