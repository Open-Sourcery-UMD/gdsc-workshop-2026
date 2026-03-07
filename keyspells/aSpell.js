document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'a') {
    castAKeyspell();
  }
});

function castAKeyspell() {
  const keyspell = document.createElement('div');
  keyspell.classList.add('keyspell');
  document.body.appendChild(keyspell);

  // Base style: black dot (FEEL FREE TO CHANGE)
  const baseStyle = {
    position: "absolute",
    bottom: "150px",
    left: "50%",
    width: "10px",
    height: "10px",
    borderRadius: "70%",
    background: "black",
    cursor: "crosshair",
  };

  // 🎨 Add more custom styling here!
  // Use real CSS property names in camelCase (like in JavaScript objects)
  // Example:
  // const customStyle = {
  //   borderRadius: "0%",
  //   background: "linear-gradient(to right, purple, cyan)",
  //   boxShadow: "0 0 15px cyan",
  //   transform: "rotate(45deg)",
  // };
  const customStyle = {
    // ADD STYLES HERE
    borderRadius: "20%",
    background: "black",
    boxShadow: "0 0 15px purple",
    transform: "rotate(45deg)",
  };

  // Apply both base and custom styles
  Object.assign(keyspell.style, baseStyle, customStyle);

  // Random direction (0°–180° so keyspell fly upward) and random speed;
  // FEEL FREE TO CHANGE THESE
  const angle = Math.random() * 180; // degrees
  const radians = (angle * Math.PI) / 180;
  const speed = 3 + Math.random() * 3; // pixels per frame

  // Starting position (roughly from the wizard’s mouth 👄)
  let x = window.innerWidth / 2;
  let y = window.innerHeight - 180;

  // Animate keyspell movement
  // convert angle+speed into x/y velocities (vy negative because y=0 is top)
  let vx = Math.cos(radians) * speed;
  let vy = -Math.sin(radians) * speed;

  // switch from using bottom to top so we can animate with y coordinates
  keyspell.style.bottom = 'auto';
  keyspell.style.left = `${x}px`;
  keyspell.style.top = `${y}px`;

  // size used for collision detection
  let w = keyspell.offsetWidth;
  let h = keyspell.offsetHeight;

  const interval = setInterval(() => {
    x += vx;
    y += vy;

    // update size in case styles/transform changed
    w = keyspell.offsetWidth;
    h = keyspell.offsetHeight;

    // bounce off left/right walls: reflect vx
    if (x <= 0) {
      x = 0;
      vx = -vx;
    } else if (x + w >= window.innerWidth) {
      x = window.innerWidth - w;
      vx = -vx;
    }

    // bounce off top/bottom walls: reflect vy
    if (y <= 0) {
      y = 0;
      vy = -vy;
    } else if (y + h >= window.innerHeight) {
      y = window.innerHeight - h;
      vy = -vy;
    }

    keyspell.style.left = `${x}px`;
    keyspell.style.top = `${y}px`;
  }, 16);

  // 🔊 (Optional) Change the sound effect here to another MP3 if you’d like!
  const audio = new Audio('keyspells/sounds/whoosh.mp3');
  audio.play();
}