const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const action = contactForm.getAttribute("action");

        if (!action) {
            formStatus.textContent = "The form is not configured correctly yet.";
            formStatus.className = "form-status is-error";
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        formStatus.textContent = "Sending your message...";
        formStatus.className = "form-status";

        try {
            const response = await fetch(action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            formStatus.textContent = "Thanks for reaching out. Your message has been sent.";
            formStatus.className = "form-status is-success";
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = "Message sending failed. Please try again in a moment or email directly at stanleysoco@gmail.com.";
            formStatus.className = "form-status is-error";
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit";
            }
        }
    });
}
