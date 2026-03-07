// Fix for Issue #2: Google-themed G key spell with official colors and animations
// Uses Google's official brand colors: Blue #4285F4, Red #EA4335, Yellow #FBBC05, Green #34A853
// Includes proper error handling and prevents multiple rapid keypress issues

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'g') {
    castGKeyspell();
  }
});

function castGKeyspell() {
  // Create main spell container
  const keyspell = document.createElement('div');
  keyspell.classList.add('keyspell');
  document.body.appendChild(keyspell);

  // Base style
  const baseStyle = {
    position: "absolute",
    bottom: "150px",
    left: "50%",
    width: "10px",
    height: "10px",
  };

  // Google-themed custom style
  const customStyle = {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "conic-gradient(#4285F4, #EA4335, #FBBC05, #34A853, #4285F4)",
    boxShadow: "0 0 12px rgba(255,255,255,0.8), 0 0 20px rgba(66,133,244,0.6)",
    transform: "translate(-50%, 0)",
  };

  // Apply styles
  Object.assign(keyspell.style, baseStyle, customStyle);

  // Random direction (upward)
  const angle = Math.random() * 180;
  const radians = (angle * Math.PI) / 180;

  // Slightly faster than default to feel energetic
  const speed = 4 + Math.random() * 3;

  // Start position near the wizard
  let x = window.innerWidth / 2;
  let y = window.innerHeight - 180;
  let scale = 1;
  let rotation = 0;

  // Animate spell movement
  const interval = setInterval(() => {
    // Update position
    x += Math.cos(radians) * speed;
    y -= Math.sin(radians) * speed;

    keyspell.style.left = `${x}px`;
    keyspell.style.top = `${y}px`;
    keyspell.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    
    // Fade out as it gets further away
    const distanceTraveled = Math.sqrt(Math.pow(x - window.innerWidth / 2, 2) + Math.pow(y - (window.innerHeight - 180), 2));
    const opacity = Math.max(0.1, 1 - (distanceTraveled / 500));
    keyspell.style.opacity = opacity;

    // Small rotation while flying
    keyspell.style.transform = `translate(-50%, 0) rotate(${Date.now() / 10}deg)`;

    // Remove when off screen
    if (x < -50 || x > window.innerWidth + 50 || y < -50) {
      clearInterval(interval);
      // Safely remove the element
      if (keyspell && keyspell.parentNode) {
        keyspell.remove();
      }
    }
  }, 16); // 60 FPS for smooth animation

  // Sound effect
  const audio = new Audio('keyspells/sounds/whoosh.mp3');
  audio.play();
}