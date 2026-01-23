/**
 * Theme Toggle Handler
 * Author: Mhr Rony (https://mhrrony.com)
 * Company: DevStation IT (https://devstationit.com)
 * © 2024-2026 Mhr Rony. All Rights Reserved.
 *
 * Manages dark/light theme switching and saves preference to localStorage
 */
document.addEventListener('DOMContentLoaded', function () {
	const themeToggleBtn = document.getElementById('theme-toggle');
	const html = document.documentElement;
	const iconDark = document.querySelector('.theme-icon-dark');
	const iconLight = document.querySelector('.theme-icon-light');

	// Check for saved theme preference or default to 'dark'
	const currentTheme = localStorage.getItem('theme') || 'dark';
	html.setAttribute('data-bs-theme', currentTheme);
	updateThemeIcon(currentTheme);

	// Theme toggle click handler
	themeToggleBtn.addEventListener('click', function () {
		const currentTheme = html.getAttribute('data-bs-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

		html.setAttribute('data-bs-theme', newTheme);
		localStorage.setItem('theme', newTheme);
		updateThemeIcon(newTheme);
	});

	function updateThemeIcon(theme) {
		if (theme === 'dark') {
			iconDark.style.display = 'inline-block';
			iconLight.style.display = 'none';
		} else {
			iconDark.style.display = 'none';
			iconLight.style.display = 'inline-block';
		}
	}
});
