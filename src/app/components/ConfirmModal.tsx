'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='relative z-50' onClose={onClose}>
				<div className='fixed inset-0 bg-black bg-opacity-30' />

				<div className='fixed inset-0 flex items-center justify-center'>
					<Dialog.Panel className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
						<Dialog.Title className='text-lg font-bold text-gray-900'>{title}</Dialog.Title>
						<p className='mt-2 text-gray-600'>{message}</p>

						<div className='mt-4 flex justify-end gap-2'>
							<button className='btn btn-secondary' onClick={onClose}>
								Cancelar
							</button>
							<button className='btn btn-error' onClick={onConfirm}>
								Confirmar
							</button>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</Transition>
	);
}
