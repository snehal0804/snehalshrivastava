const root = document.documentElement;
const modeToggle = document.querySelector("[data-mode-toggle]");
const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const storedMode = localStorage.getItem("portfolio-mode");
const preferredMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyMode = (mode) => {
    root.dataset.mode = mode;

    if (!modeToggle) {
        return;
    }

    const nextMode = mode === "dark" ? "light" : "dark";
    modeToggle.dataset.mode = mode;
    modeToggle.setAttribute("aria-label", `Switch to ${nextMode} mode`);
    modeToggle.setAttribute("title", `Switch to ${nextMode} mode`);
};

applyMode(storedMode || preferredMode);

if (modeToggle) {
    modeToggle.addEventListener("click", () => {
        const nextMode = root.dataset.mode === "dark" ? "light" : "dark";
        applyMode(nextMode);
        localStorage.setItem("portfolio-mode", nextMode);
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.16
});

reveals.forEach((element) => revealObserver.observe(element));

const animateCounter = (element) => {
    const target = Number(element.dataset.count);
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(target * eased);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.45
});

counters.forEach((counter) => counterObserver.observe(counter));
