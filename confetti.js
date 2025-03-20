const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 6 + 2,  // Chiều rộng hạt confetti
        height: Math.random() * 4 + 2, // Chiều cao hạt confetti
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        speedX: (Math.random() - 0.5) * 0.8,  // Giảm tốc độ ngang
        speedY: Math.random() * 1.5 + 0.5,   // Giảm tốc độ rơi
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2
    };
}

// Tạo nhiều confetti
for (let i = 0; i < 150; i++) {  // Giảm số lượng một chút để đỡ rối
    particles.push(createParticle());
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }

        drawParticle(p);
    });

    requestAnimationFrame(updateParticles);
}

function drawParticle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
    ctx.restore();
}

updateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
