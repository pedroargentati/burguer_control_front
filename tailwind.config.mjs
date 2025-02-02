import forms from '@tailwindcss/forms';
import daisy from 'daisyui';

export function shortcuts({ addUtilities }) {
	return addUtilities({
		'.debug': {
			'@apply border-2 border-solid border-error': {},
		},
		'.centered': {
			'@apply items-center justify-center': {},
		},
		'.size-screen': {
			'@apply h-screen w-screen': {},
		},
	});
}

export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: false,
		darkTheme: 'dark',
		base: true,
		styled: true,
		utils: true,
		prefix: '',
		logs: false,
		themeRoot: ':root',
	},
	plugins: [forms, shortcuts, daisy],
};
