/* ─────────────────────────────────────────────
   Riakona Construction — script.js
   Improvements applied:
     #3 Navbar scroll shadow
     #4 Toast notification system
     #5 Scroll-triggered entrance animations
   ───────────────────────────────────────────── */

// ─── IMPROVEMENT 3: Navbar scroll shadow ───────────────────────────────────
(function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load
})();


// ─── IMPROVEMENT 4: Toast notification system ─────────────────────────────

/**
 * Show a toast notification.
 * @param {string} message  - Text to display
 * @param {"success"|"error"} type - Visual style
 * @param {number} duration - Auto-dismiss delay in ms (default 4000)
 */
function showToast(message, type = "success", duration = 4000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const icon = type === "success" ? "✓" : "✕";

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${icon}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Dismiss notification">✕</button>
  `;

  container.appendChild(toast);

  function dismiss() {
    toast.classList.add("toast-exit");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }

  toast.querySelector(".toast-close").addEventListener("click", dismiss);
  setTimeout(dismiss, duration);
}


// ─── Form helper: submit with toast feedback ──────────────────────────────

async function handleFormSubmit(form, accessKey, successMessage) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;

  const originalText = submitBtn.textContent;

  const formData = new FormData(form);
  formData.append("access_key", accessKey);

  submitBtn.textContent = "Sending…";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      showToast(successMessage, "success");
      form.reset();
    } else {
      showToast("Error: " + data.message, "error");
    }
  } catch {
    showToast("Something went wrong. Please try again.", "error");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}


// ─── Email subscribe form (footer — present on all pages) ─────────────────
const emailSubscribeForm = document.getElementById("emailSubscribe");
if (emailSubscribeForm) {
  emailSubscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(
      emailSubscribeForm,
      "28d1a3ad-bf05-4d84-8f84-b0d51e27ed9b",
      "You're subscribed! We'll keep you in the loop."
    );
  });
}


// ─── Contact form (contact.html) ──────────────────────────────────────────
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(
      contactForm,
      "1a72941b-eaeb-4fec-bc60-5baf753f8532",
      "Thanks for reaching out! We'll get back to you soon."
    );
  });
}


// ─── IMPROVEMENT 5: Scroll-triggered entrance animations ──────────────────
(function initScrollAnimations() {
  // Add .animate-on-scroll to elements we want to animate in
  const targets = [
    ".service-container .col",
    ".about_section",
    ".faq-question",
    ".ourTeam .teamMemberTitle",
  ];

  const elements = document.querySelectorAll(targets.join(", "));
  elements.forEach((el) => el.classList.add("animate-on-scroll"));

  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
})();
