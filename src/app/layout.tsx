import type { Metadata } from 'next';
import './globals.css';
import Footer from './components/Footer';

export const metadata: Metadata = {
	title: 'Burger Control',
	description: 'Gerenciamento de pedidos de hambúrgueres',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-BR'>
			<body className='flex min-h-screen flex-col bg-gray-100'>
				<header className='bg-base-300 p-4 shadow-lg'>
					<div className='container mx-auto flex items-center justify-between'>
						<h1 className='text-xl font-bold text-primary'>🍔 Burger Control</h1>
						<nav>
							<ul className='flex gap-4'>
								<li>
									<a href='/' className='text-gray-300 hover:text-primary'>
										Home
									</a>
								</li>
								<li>
									<a href='/orders' className='text-gray-300 hover:text-primary'>
										Pedidos
									</a>
								</li>
								<li>
									<a href='/orders/new' className='text-gray-300 hover:text-primary'>
										Novo Pedido
									</a>
								</li>
								<li>
									<a href='/ingredients' className='text-gray-300 hover:text-primary'>
										Ingredientes
									</a>
								</li>
								<li>
									<a href='/guests' className='text-gray-300 hover:text-primary'>
										Convidados
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</header>

				<main className='container mx-auto flex-grow p-6'>{children}</main>

				<Footer />
			</body>
		</html>
	);
}
