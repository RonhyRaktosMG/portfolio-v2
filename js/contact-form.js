/**
 * Contact Form Handler
 * Author: Mhr Rony (https://mhrrony.com)
 * Company: DevStation IT (https://devstationit.com)
 * © 2024-2026 Mhr Rony. All Rights Reserved.
 *
 * Handles form submission, validation, and API communication
 */
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('contact-form');
	const submitBtn = document.getElementById('submit-btn');
	const successAlert = document.getElementById('alert-success');
	const errorAlert = document.getElementById('alert-error');
	const errorMessage = document.getElementById('error-message');

	if (!form || !submitBtn || !successAlert || !errorAlert || !errorMessage) {
		console.error('Form elements not found');
		return;
	}

	form.addEventListener('submit', async function (e) {
		e.preventDefault();

		console.log('Form submission started');

		// Get form data (note: message field has different ID in index.html)
		const formData = {
			name: document.getElementById('name').value.trim(),
			email: document.getElementById('email').value.trim(),
			message: document.getElementById('form-message').value.trim()
		};

		console.log('Form data:', formData);

		// Hide alerts
		successAlert.classList.add('d-none');
		errorAlert.classList.add('d-none');

		// Show loading state
		submitBtn.disabled = true;
		const originalText = submitBtn.textContent;
		submitBtn.textContent = 'Sending...';

		try {
			console.log('Sending request to /api/contact');

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			});

			console.log('Response status:', response.status);

			let result;
			try {
				result = await response.json();
				console.log('Response data:', result);
			} catch (parseError) {
				console.error('JSON parse error:', parseError);
				throw new Error(`Server returned ${response.status}: ${response.statusText}`);
			}

			if (response.ok && result.success) {
				// Success
				console.log('Email sent successfully');
				successAlert.classList.remove('d-none');
				form.reset();

				// Update button to show success
				submitBtn.textContent = 'Sent Successfully!';
				submitBtn.classList.remove('btn-primary');
				submitBtn.classList.add('btn-success');

				// Reset button after 3 seconds
				setTimeout(() => {
					submitBtn.textContent = originalText;
					submitBtn.classList.remove('btn-success');
					submitBtn.classList.add('btn-primary');
					submitBtn.disabled = false;
				}, 3000);

				return; // Don't reset button in finally block for success case
			} else {
				// Error from server
				console.error('Server error:', response.status, result);
				let errorMsg = result.error || `Server error (${response.status}): ${response.statusText}`;

				if (response.status === 403) {
					errorMsg = 'Access denied. Please try again or contact support.';
				} else if (response.status === 500) {
					errorMsg = 'Server error. Please try again later.';
				}

				errorMessage.textContent = errorMsg;
				errorAlert.classList.remove('d-none');
			}
		} catch (error) {
			// Network or other error
			console.error('Form submission error:', error);
			errorMessage.textContent = 'Network error. Please check your connection and try again.';
			errorAlert.classList.remove('d-none');
		} finally {
			// Reset button state (only for error cases)
			submitBtn.disabled = false;
			submitBtn.textContent = originalText;
		}
	});
});
