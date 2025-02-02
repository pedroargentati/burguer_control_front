export default function IngredientsPage() {
	return (
		<div>
			<h1 className='mb-4 text-2xl font-bold'>Gerenciar Ingredientes</h1>
			<ul className='list-inside list-disc'>
				<li>Pão</li>
				<li>Queijo</li>
				<li>Molho especial</li>
			</ul>
			<button className='btn btn-primary mt-4'>Adicionar Ingrediente</button>
		</div>
	);
}
