const form = document.getElementById("emailSubscribe");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "d536f1de-14f8-46c9-b94c-54c71518fbb8");

  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      form.reset();
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

const contact_form = document.getElementById("contactForm");
const submitButton = form.querySelector('button[type="submit"]');

contact_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contact_form);
  formData.append("access_key", "8bb18cf2-c57d-4a86-8d80-0fef4af03b73");

  const originalText = submitButton.textContent;

  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      contact_form.reset();
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
});
