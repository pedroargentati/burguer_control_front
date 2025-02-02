export default function NewOrderPage() {
	return (
		<div>
			<h1 className='mb-4 text-2xl font-bold'>Novo Pedido</h1>
			<form className='space-y-4'>
				<input type='text' placeholder='Nome' className='input input-bordered w-full' />
				<select className='select select-bordered w-full'>
					<option>Ao ponto</option>
					<option>Bem passado</option>
					<option>Mal passado</option>
				</select>
				<button type='submit' className='btn btn-primary w-full'>
					Criar Pedido
				</button>
			</form>
		</div>
	);
}
