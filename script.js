// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  links.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.tagName === "A" && !target.hasAttribute("data-booking-open")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// Smooth scroll for internal anchors (extra smooth + consistent across browsers)
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const href = a.getAttribute("href");
  if (!href || href === "#") return;

  const el = document.querySelector(href);
  if (!el) return;

  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });

  // Close mobile nav after scrolling
  if (links && links.classList.contains("open")) {
    links.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});

// Booking modal
const BOOKING_URL = "https://calendar.app.google/CCQGnSHv1eRjo9Vc8";
const modal = document.getElementById("booking-modal");
const iframe = modal?.querySelector(".modal-iframe");
const openButtons = document.querySelectorAll("[data-booking-open]");
const closeButtons = modal?.querySelectorAll("[data-modal-close]");

function openModal() {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Set src on open (helps avoid background loads)
  if (iframe && !iframe.getAttribute("src")) {
    iframe.setAttribute("src", BOOKING_URL);
  }
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

openButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();

    // Close mobile menu if open
    if (links && links.classList.contains("open")) {
      links.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
});

closeButtons?.forEach((btn) => btn.addEventListener("click", closeModal));

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
});

// Referral note: read ?ref-id=someone and show in footer
(function referralFooter() {
  const params = new URLSearchParams(window.location.search);
  const refId = params.get("ref-id"); // matches ?ref-id=ryanlee

  const note = document.getElementById("referral-note");
  if (!note) return;

  // Basic safety: only allow simple handle-like values
  // (letters, numbers, underscore, dash, dot; 2-40 chars)
  const ok = typeof refId === "string" && /^[a-zA-Z0-9_.-]{2,40}$/.test(refId);

  if (!ok) return;

  note.textContent = `${refId} referred you to me`;
  note.hidden = false;
})();

