document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'e') {
    castEKeyspell();
  }
});

function castEKeyspell() {
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
    borderRadius: "50%",
    background: "black",
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
     background: "linear-gradient(to right, magenta, blue)",
     borderRadius: "67%",
     boxShadow: "0 0 20px black",
     transform: "rotate(69deg)",
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
  const interval = setInterval(() => {
    x += Math.cos(radians) * speed;
    y -= Math.sin(radians) * speed;
    keyspell.style.left = `${x}px`;
    keyspell.style.top = `${y}px`;

    // Remove keyspell when it leaves the screen
    if (x < -50 || x > window.innerWidth + 50 || y < -50) {
      clearInterval(interval);
      keyspell.remove();
    }
  }, 16);

  // 🔊 (Optional) Change the sound effect here to another MP3 if you’d like!
  const audio = new Audio('keyspells/sounds/whoosh.mp3');
  audio.play();
}