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

  // Google official colors
  const googleColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']; // Blue, Red, Yellow, Green
  const randomColor = googleColors[Math.floor(Math.random() * googleColors.length)];

  // Base style: Google-themed circular spell
  const baseStyle = {
    position: "absolute",
    bottom: "150px",
    left: "50%",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: randomColor,
  };

  // Google-themed custom styling with animations
  const customStyle = {
    boxShadow: `0 0 20px ${randomColor}, 0 0 40px ${randomColor}40`, // Glowing effect with transparency
    border: `2px solid ${randomColor}`,
    transform: "scale(1)",
    transition: "all 0.3s ease-out",
    zIndex: "1000",
    // Add a subtle pulsing animation
    animation: "googlePulse 0.6s ease-in-out"
  };

  // Create CSS animation for pulsing effect
  if (!document.getElementById('google-spell-styles')) {
    const style = document.createElement('style');
    style.id = 'google-spell-styles';
    style.textContent = `
      @keyframes googlePulse {
        0% { transform: scale(0.5); opacity: 0.8; }
        50% { transform: scale(1.3); opacity: 1; }
        100% { transform: scale(1); opacity: 0.9; }
      }
      @keyframes googleSpin {
        from { transform: rotate(0deg) scale(1); }
        to { transform: rotate(360deg) scale(1.2); }
      }
    `;
    document.head.appendChild(style);
  }

  // Apply both base and custom styles
  Object.assign(keyspell.style, baseStyle, customStyle);

  // Random direction (0°–180° so keyspell flies upward) and random speed
  const angle = Math.random() * 180; // degrees
  const radians = (angle * Math.PI) / 180;
  const speed = 4 + Math.random() * 4; // Slightly faster for more dynamic effect

  // Starting position (roughly from the wizard's mouth)
  let x = window.innerWidth / 2;
  let y = window.innerHeight - 180;
  let scale = 1;
  let rotation = 0;

  // Enhanced animation with scaling and rotation effects
  const interval = setInterval(() => {
    // Update position
    x += Math.cos(radians) * speed;
    y -= Math.sin(radians) * speed;
    
    // Add spinning and scaling effects as it travels
    rotation += 8; // Degrees per frame
    scale += 0.02; // Gradually grow larger
    
    // Apply transformations
    keyspell.style.left = `${x}px`;
    keyspell.style.top = `${y}px`;
    keyspell.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    
    // Fade out as it gets further away
    const distanceTraveled = Math.sqrt(Math.pow(x - window.innerWidth / 2, 2) + Math.pow(y - (window.innerHeight - 180), 2));
    const opacity = Math.max(0.1, 1 - (distanceTraveled / 500));
    keyspell.style.opacity = opacity;

    // Remove keyspell when it leaves the screen or becomes too faded
    if (x < -100 || x > window.innerWidth + 100 || y < -100 || opacity <= 0.1) {
      clearInterval(interval);
      // Safely remove the element
      if (keyspell && keyspell.parentNode) {
        keyspell.remove();
      }
    }
  }, 16); // 60 FPS for smooth animation

  // Play sound effect with error handling
  try {
    const audio = new Audio('keyspells/sounds/whoosh.mp3');
    // Handle audio loading errors gracefully
    audio.addEventListener('error', () => {
      console.warn('Google spell audio could not be loaded, continuing without sound');
    });
    audio.play().catch(() => {
      // Ignore audio play errors (common in some browsers without user interaction)
    });
  } catch (error) {
    // Continue without sound if there's an error
    console.warn('Google spell audio initialization failed:', error.message);
  }

  // Add sparkle trail effect using Google colors
  createSparkleTrail(x, y, randomColor);
}

// Helper function to create a sparkle trail effect
function createSparkleTrail(startX, startY, color) {
  const sparkleCount = 5;
  
  for (let i = 0; i < sparkleCount; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        left: ${startX + (Math.random() - 0.5) * 30}px;
        top: ${startY + (Math.random() - 0.5) * 30}px;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: sparkleFloat 1s ease-out forwards;
      `;
      
      // Add sparkle animation if not already added
      if (!document.getElementById('sparkle-animation')) {
        const sparkleStyle = document.createElement('style');
        sparkleStyle.id = 'sparkle-animation';
        sparkleStyle.textContent = `
          @keyframes sparkleFloat {
            0% { opacity: 1; transform: scale(1) translateY(0); }
            100% { opacity: 0; transform: scale(0.3) translateY(-50px); }
          }
        `;
        document.head.appendChild(sparkleStyle);
      }
      
      document.body.appendChild(sparkle);
      
      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle && sparkle.parentNode) {
          sparkle.remove();
        }
      }, 1000);
    }, i * 100); // Stagger the sparkles
  }
}