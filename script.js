const marqueeTrack = document.getElementById('marqueeTrack');
const cards = Array.from(marqueeTrack.children);
const totalCards = cards.length;
let speed = 0.16;
let currentX = 0;
let lastFrameTime = performance.now();

function createDuplicateItems() {
    const fragment = document.createDocumentFragment();
    cards.forEach((card) => {
        const clone = card.cloneNode(true);
        fragment.appendChild(clone);
    });
    marqueeTrack.appendChild(fragment);
}

function updateFrame(timestamp) {
    const delta = Math.min(timestamp - lastFrameTime, 40);
    lastFrameTime = timestamp;
    currentX -= speed * delta;

    const trackWidth = marqueeTrack.scrollWidth / 2;
    if (Math.abs(currentX) >= trackWidth) {
        currentX += trackWidth;
    }

    marqueeTrack.style.transform = `translateX(${currentX}px)`;
    requestAnimationFrame(updateFrame);
}

function setSpeed(hovering) {
    speed = hovering ? 0.04 : 0.16;
}

function attachHoverEvents() {
    marqueeTrack.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mouseenter', () => setSpeed(true));
        card.addEventListener('mouseleave', () => setSpeed(false));
        card.addEventListener('focusin', () => setSpeed(true));
        card.addEventListener('focusout', () => setSpeed(false));
    });
}

createDuplicateItems();
attachHoverEvents();
requestAnimationFrame(updateFrame);
