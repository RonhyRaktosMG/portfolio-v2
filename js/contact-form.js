const form = document.getElementById("contact-form");
const successAlert = document.getElementById("alert-success");
const errorAlert = document.getElementById("alert-error");
const submitBtn = document.getElementById("submit-btn");

const spinner = submitBtn.querySelector(".spinner-border");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset alerts
  successAlert.classList.add("d-none");
  errorAlert.classList.add("d-none");

  // Show loading
  submitBtn.disabled = true;
  if (spinner) spinner.classList.remove("d-none");

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      successAlert.classList.remove("d-none");
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    errorAlert.classList.remove("d-none");
  } finally {
    submitBtn.disabled = false;
	const spinner = submitBtn.querySelector(".spinner-border");
    if (spinner) spinner.classList.add("d-none");
  }
});
