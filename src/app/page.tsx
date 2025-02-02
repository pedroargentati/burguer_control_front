export default function HomePage() {
	return (
		<div className='py-12 text-center'>
			<h1 className='mb-4 text-4xl font-bold text-primary'>Bem-vindo ao Burger Control 🍔</h1>
			<p className='mb-6 text-lg text-gray-700'>Gerencie pedidos de hambúrgueres de forma rápida e eficiente.</p>
			<div className='flex justify-center gap-4'>
				<a href='/events' className='btn btn-primary'>
					Criar Evento
				</a>
			</div>
		</div>
	);
}
