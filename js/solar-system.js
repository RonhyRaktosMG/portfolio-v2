document.addEventListener('DOMContentLoaded', function () {
	const orbits = document.querySelectorAll('.orbit');
	orbits.forEach((orbit, index) => {
		const randomRotation = Math.floor(Math.random() * 360);

		// Get computed style to preserve original animation settings
		const computedStyle = window.getComputedStyle(orbit);
		const duration = computedStyle.animationDuration;
		const direction = computedStyle.animationDirection;

		// Create unique animation name
		const animName = `rotate-${index}-${Date.now()}`;

		// Add keyframes with random starting position
		const style = document.createElement('style');
		style.textContent = `
			@keyframes ${animName} {
				from { transform: rotate(${randomRotation}deg); }
				to { transform: rotate(${randomRotation + 360}deg); }
			}
		`;
		document.head.appendChild(style);

		// Apply the animation with original settings
		orbit.style.animation = `${animName} ${duration} linear infinite`;
		orbit.style.animationDirection = direction;
	});
});
