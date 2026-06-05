// ── CUSTOM CURSOR ──
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();
document
  .querySelectorAll("a,button,.project-card,.service-card,.svc")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.style.transform = "translate(-50%,-50%) scale(2)";
      ring.style.opacity = "0.2";
    });
    el.addEventListener("mouseleave", () => {
      cur.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.opacity = "0.6";
    });
  });

// ── PARTICLES ──
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W,
  H,
  dots = [];
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);
for (let i = 0; i < 55; i++) {
  dots.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.5 + 0.5,
    o: Math.random() * 0.4 + 0.1,
  });
}
function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  dots.forEach((d) => {
    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0) d.x = W;
    if (d.x > W) d.x = 0;
    if (d.y < 0) d.y = H;
    if (d.y > H) d.y = 0;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(41,121,255,${d.o})`;
    ctx.fill();
  });
  // connect nearby
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x,
        dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(41,121,255,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(".reveal");
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        ro.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => ro.observe(el));

// ── SKILL BARS ──
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".skill-fill").forEach((bar) => {
          bar.style.width = bar.dataset.w + "%";
        });
        skillObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll(".skill-category")
  .forEach((el) => skillObs.observe(el));

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button");
  btn.textContent = "Message Sent ✓";
  btn.style.background = "#0d6e0d";
  btn.style.boxShadow = "0 0 16px rgba(0,200,0,0.3)";
  setTimeout(() => {
    btn.textContent = "Send Message →";
    btn.style.background = "";
    btn.style.boxShadow = "";
    e.target.reset();
  }, 3500);
}

// ── ACTIVE NAV ──
const sections = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let cur = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 110) cur = s.id;
  });
  navAs.forEach((a) => {
    a.style.color = a.getAttribute("href") === "#" + cur ? "var(--white)" : "";
  });
});
