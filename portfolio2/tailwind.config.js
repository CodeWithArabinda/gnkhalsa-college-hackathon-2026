/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"./index.html",
		"./index.js",
		"./assets/**/*.{html,js}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#000",
				secondary: "#fff", 
			}
		},
	},
	plugins: [],
};
