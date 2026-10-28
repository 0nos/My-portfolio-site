const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const yearEl = document.getElementById("year");
const timeEl = document.getElementById("abuja-time");
const filterButtons = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-card");
const dialog = document.getElementById("case-dialog");
const dialogBody = document.getElementById("case-dialog-body");
const dialogClose = document.querySelector(".case-close");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function paintTime() {
  if (!timeEl) return;
  const now = new Date();
  const text = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  timeEl.textContent = text;
  timeEl.setAttribute("datetime", now.toISOString());
}

paintTime();
window.setInterval(paintTime, 30000);

if (navToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      closeMenu();
    }
  });
}

document.querySelectorAll('a[href="#site-top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    workCards.forEach((card) => {
      const show = filter === "all" || card.dataset.kind === filter;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

function openCase(id) {
  const card = document.querySelector(`.work-card[data-case="${id}"]`);
  if (!card || !dialog || !dialogBody) return;
  const source = card.querySelector(".case-data");
  if (!source) return;
  dialogBody.innerHTML = source.innerHTML;
  const heading = dialogBody.querySelector("h3");
  if (heading) heading.id = "case-dialog-title";
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeCase() {
  if (!dialog) return;
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

document.querySelectorAll(".work-open").forEach((button) => {
  button.addEventListener("click", () => openCase(button.dataset.case));
});

if (dialogClose) {
  dialogClose.addEventListener("click", closeCase);
}

if (dialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeCase();
  });
}
