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
const collageBg = document.getElementById("collageBg");

const collageImages = [
  "Photos/photo-01.jpg",
  "Photos/photo-02.jpg",
  "Photos/photo-03.jpg",
  "Photos/photo-04.jpg",
  "Photos/photo-05.jpg",
  "Photos/photo-06.jpg",
  "Photos/photo-07.jpg",
  "Photos/photo-08.jpg",
  "Photos/photo-09.jpg",
  "Photos/photo-10.jpg",
  "Photos/photo-11.jpg",
  "Photos/photo-12.jpg",
  "Photos/photo-13.jpg",
  "Photos/photo-14.jpg",
  "Photos/photo-15.jpg",
  "Photos/photo-16.jpg",
  "Photos/photo-17.jpg",
  "Photos/photo-18.jpg",
  "Photos/photo-19.jpg",
  "Photos/photo-20.jpg",
  "Photos/photo-21.jpg",
  "Photos/photo-22.jpg",
  "Photos/photo-23.jpg",
  "Photos/photo-24.jpg",
  "Photos/photo-25.jpg",
];

const portraitPhotos = new Set([
  "photo-06.jpg",
  "photo-07.jpg",
  "photo-08.jpg",
  "photo-09.jpg",
  "photo-10.jpg",
  "photo-11.jpg",
  "photo-12.jpg",
  "photo-14.jpg",
  "photo-15.jpg",
  "photo-16.jpg",
  "photo-17.jpg",
  "photo-23.jpg",
  "photo-24.jpg",
]);

const focalYByPhoto = {
  "photo-04.jpg": "38%",
  "photo-06.jpg": "8%",
  "photo-07.jpg": "6%",
  "photo-08.jpg": "8%",
  "photo-09.jpg": "10%",
  "photo-10.jpg": "10%",
  "photo-11.jpg": "12%",
  "photo-12.jpg": "10%",
  "photo-14.jpg": "10%",
  "photo-15.jpg": "8%",
  "photo-16.jpg": "8%",
  "photo-17.jpg": "10%",
  "photo-23.jpg": "12%",
  "photo-24.jpg": "14%",
};

const original = {
  title: title.textContent,
  subtitle: subtitle.textContent,
};

let noMoves = 0;

function buildCollage() {
  if (!collageBg) return;

  const viewportArea = window.innerWidth * window.innerHeight;
  const total = Math.max(collageImages.length * 2, Math.ceil(viewportArea / 18000) + 28);

  for (let index = 0; index < total; index += 1) {
    const src = collageImages[index % collageImages.length];
    const file = src.split("/").pop();
    const isPortrait = portraitPhotos.has(file);
    const tile = document.createElement("div");
    const roll = Math.random();
    let variant = "";
    if (isPortrait) {
      if (roll > 0.92) variant = "tall";
    } else {
      if (roll > 0.92) variant = "wide";
      if (roll > 0.99) variant = "hero";
    }

    tile.className = `collage-tile ${variant}`.trim();
    tile.style.backgroundImage = `url("${src}")`;
    tile.style.setProperty("--posy", focalYByPhoto[file] || (isPortrait ? "14%" : "30%"));
    tile.style.setProperty("--r", `${(Math.random() * 4 - 2).toFixed(2)}deg`);
    tile.style.setProperty("--s", `${(Math.random() * 0.08 + 0.96).toFixed(2)}`);
    tile.style.animationDelay = `${index * 35}ms`;
    collageBg.appendChild(tile);
  }
}

function openEnvelope() {
  envelope.classList.add("opening");
  openBtn.disabled = true;
  document.body.classList.add("proposal-open");

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

buildCollage();
