const root = document;

const tabs = document.querySelectorAll(".tab");
const panels = {
  tech: document.querySelector("#panel-tech"),
  human: document.querySelector("#panel-human"),
  interests: document.querySelector("#panel-interests"),
  learning: document.querySelector("#panel-learning")
};

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    Object.values(panels).forEach(panel => panel.classList.remove("active"));
    tab.classList.add("active");
    const panel = panels[tab.dataset.tab];
    if (panel) panel.classList.add("active");
  });
});

const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalText = document.querySelector(".modal-text");
const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.title || "Projeto";
    modalText.textContent = button.dataset.text || "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

// Highlight the navigation item that corresponds to the visible section.
const navLinks = [...document.querySelectorAll(".nav nav a")];
const sections = [...document.querySelectorAll("main > section[id]")];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.style.opacity = link.getAttribute("href") === `#${entry.target.id}` ? "1" : ".65";
    });
  });
}, { threshold: 0.45 });

sections.forEach(section => observer.observe(section));
