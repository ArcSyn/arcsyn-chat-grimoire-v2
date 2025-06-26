
// Background particles animation
const sparkleCanvas = document.getElementById("sparkle-canvas");
const sparkleCtx = sparkleCanvas.getContext("2d");
let canvasWidth, canvasHeight;

function resizeCanvas() {
  canvasWidth = sparkleCanvas.width = window.innerWidth;
  canvasHeight = sparkleCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const sparkleParticles = [];
for (let i = 0; i < 80; i++) {
  sparkleParticles.push({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 1.2 + 0.5,
    alpha: Math.random() * 0.8 + 0.1,
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2,
  });
}

function animateParticles() {
  sparkleCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let p of sparkleParticles) {
    sparkleCtx.beginPath();
    sparkleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    sparkleCtx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
    sparkleCtx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvasWidth) p.dx *= -1;
    if (p.y < 0 || p.y > canvasHeight) p.dy *= -1;
  }
  requestAnimationFrame(animateParticles);
}

// Start animation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  animateParticles();
});
