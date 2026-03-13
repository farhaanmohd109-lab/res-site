window.addEventListener("DOMContentLoaded", () => {

    /* ===== CAROUSEL ===== */
    document.querySelectorAll(".carousel-wrapper").forEach(wrapper => {
        const carousel = wrapper.querySelector(".carousel");
        const leftBtn = wrapper.querySelector(".left");
        const rightBtn = wrapper.querySelector(".right");

        if (!carousel || !leftBtn || !rightBtn) return;

        const scrollAmount = 220;

        rightBtn.addEventListener("click", () => {
            carousel.scrollLeft += scrollAmount;
        });

        leftBtn.addEventListener("click", () => {
            carousel.scrollLeft -= scrollAmount;
        });
    });
/* ===============================
   BACKGROUND COLOR AS PER MOVIE
================================= */

const smokeLayer = document.querySelector(".bg-layer.smoke");
const cards = document.querySelectorAll(".movie-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        const color = card.dataset.color;

        smokeLayer.style.transition = "background 0.6s ease";

        smokeLayer.style.background = `
            radial-gradient(circle at 30% 30%, ${color}88, transparent 50%),
            radial-gradient(circle at 70% 70%, ${color}44, transparent 60%)
        `;
    });

    card.addEventListener("mouseleave", () => {
        smokeLayer.style.background = `
            radial-gradient(circle at 30% 30%, #5a00cc33, transparent 50%),
            radial-gradient(circle at 70% 70%, #8a2be233, transparent 50%)
        `;
    });

});

    /* ===============================
       ULTRA SMOOTH GALAXY GLITTER
    ================================= */

    const canvas = document.getElementById("sparkles");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const PARTICLE_COUNT = 5000;   // dense cinematic glitter


    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            radius: Math.random() * 0.8 + 0.1,
            opacity: Math.random() * 0.6 + 0.2
        });
    }

    let mouse = { x: null, y: null };

    document.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            p.vx *= 0.995;
            p.vy *= 0.995;

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            if (mouse.x && mouse.y) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    p.vx += dx * 0.00002;
                    p.vy += dy * 0.00002;
                }
            }

            const twinkle = Math.sin(Date.now() * 0.002 + p.x) * 0.2 + 0.8;

            ctx.beginPath();
            ctx.fillStyle = `rgba(210,170,255,${p.opacity * twinkle})`;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
/* ===== SEARCH MOVIES (CAROUSEL SAFE) ===== */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    document.querySelectorAll(".movie-card").forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(value)) {
            card.style.opacity = "1";
            card.style.pointerEvents = "auto";
            card.style.transform = "scale(1)";
        } else {
            card.style.opacity = "0.15";
            card.style.pointerEvents = "none";
            card.style.transform = "scale(0.85)";
        }
    });
});


});
function openBooking(){
    window.location.href = "booking.html?direct=true";
}