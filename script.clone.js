const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.18
});

reveals.forEach((element) => revealObserver.observe(element));

const animateCounter = (element) => {
    const target = Number(element.dataset.count);
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    };

    requestAnimationFrame(tick);
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
    threshold: 0.6
});

counters.forEach((counter) => counterObserver.observe(counter));
