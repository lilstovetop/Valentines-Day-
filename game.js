const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const actions = document.getElementById("actions");
const result = document.getElementById("result");
const hearts = document.getElementById("hearts");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const replayBtn = document.getElementById("replayBtn");
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const card = document.getElementById("card");

const original = {
  title: title.textContent,
  subtitle: subtitle.textContent,
};

let noMoves = 0;

function openEnvelope() {
  envelope.classList.add("opening");
  openBtn.disabled = true;

  setTimeout(() => {
    envelope.hidden = true;
    card.hidden = false;
  }, 650);
}

function moveNoButton() {
  if (actions.hidden) return;

  const containerRect = actions.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, containerRect.width - btnRect.width);
  const maxY = Math.max(0, containerRect.height - btnRect.height);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noMoves += 1;

  if (noMoves === 3) {
    subtitle.textContent = "Okay, the No button is a little shy.";
  }
  if (noMoves === 6) {
    subtitle.textContent = "It keeps running away because it knows the answer.";
  }
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const size = 12 + Math.random() * 16;
  const startLeft = 15 + Math.random() * 70;
  const startTop = 65 + Math.random() * 20;
  const driftX = (Math.random() * 120 - 60).toFixed(1);
  const driftY = (-120 - Math.random() * 120).toFixed(1);

  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${startLeft}%`;
  heart.style.top = `${startTop}%`;
  heart.style.setProperty("--x", `${driftX}px`);
  heart.style.setProperty("--y", `${driftY}px`);

  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 2600);
}

function celebrate() {
  for (let i = 0; i < 24; i += 1) {
    setTimeout(createHeart, i * 80);
  }
}

function onYes() {
  actions.hidden = true;
  result.hidden = false;
  title.textContent = "You just made my day.";
  subtitle.textContent = "Now it’s official. Valentine status: confirmed.";
  celebrate();
}

function onReplay() {
  actions.hidden = false;
  result.hidden = true;
  title.textContent = original.title;
  subtitle.textContent = original.subtitle;
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noMoves = 0;
  hearts.innerHTML = "";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("pointerdown", moveNoButton);

yesBtn.addEventListener("click", onYes);
replayBtn.addEventListener("click", onReplay);
openBtn.addEventListener("click", openEnvelope);
