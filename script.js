const pages = document.querySelectorAll(".page");

let current = 0;

pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
});

document.getElementById("next").onclick = () => {

    if (current < pages.length) {

        pages[current].classList.add("flipped");

        current++;

    }

    if (current === pages.length) {

        confettiExplosion();

    }

};

document.getElementById("prev").onclick = () => {

    if (current > 0) {

        current--;

        pages[current].classList.remove("flipped");

    }

};

/* =======================
      CONFETTI
======================= */

const canvas = document.getElementById("confetti");

const ctx = canvas.getContext("2d");

function resize() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resize();

window.onresize = resize;

let confetti = [];

function Confetti() {

    this.x = Math.random() * canvas.width;

    this.y = Math.random() * canvas.height - canvas.height;

    this.size = Math.random() * 8 + 4;

    this.speed = Math.random() * 3 + 2;

    this.color = `hsl(${Math.random() * 360},100%,50%)`;

    this.angle = Math.random() * 360;

}

function confettiExplosion() {

    confetti = [];

    for (let i = 0; i < 350; i++) {

        confetti.push(new Confetti());

    }

    animate();

}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(c => {

        ctx.save();

        ctx.translate(c.x, c.y);

        ctx.rotate(c.angle);

        ctx.fillStyle = c.color;

        ctx.fillRect(0, 0, c.size, c.size);

        ctx.restore();

        c.y += c.speed;

        c.angle += 0.05;

    });

    confetti = confetti.filter(c => c.y < canvas.height + 20);

    if (confetti.length) {

        requestAnimationFrame(animate);

    }

}