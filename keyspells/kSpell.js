// Kubernetes-themed K key spell with official color and radial burst animation
// Uses Kubernetes official color: #326CE5 (blue)
// Creates a hexagonal radial burst effect representing the Kubernetes logo

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'k') {
    castKKeyspell();
  }
});

function castKKeyspell() {
  // Kubernetes official color
  const k8sBlue = '#326CE5';
  
  // Create main spell container (central hexagon)
  const keyspell = document.createElement('div');
  keyspell.classList.add('keyspell');
  document.body.appendChild(keyspell);

  // Base style: Kubernetes hexagonal shape
  const baseStyle = {
    position: "absolute",
    bottom: "150px",
    left: "50%",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: k8sBlue,
  };

  // Kubernetes-themed custom styling
  const customStyle = {
    boxShadow: `0 0 25px ${k8sBlue}, 0 0 50px ${k8sBlue}80`,
    border: `3px solid ${k8sBlue}`,
    transform: "scale(1)",
    zIndex: "1000",
    opacity: "1"
  };

  // Create CSS animations for Kubernetes spell
  if (!document.getElementById('k8s-spell-styles')) {
    const style = document.createElement('style');
    style.id = 'k8s-spell-styles';
    style.textContent = `
      @keyframes k8sPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.4); }
      }
      @keyframes k8sRadiate {
        0% { transform: scale(0.5) rotate(0deg); opacity: 1; }
        100% { transform: scale(2.5) rotate(180deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Apply styles
  Object.assign(keyspell.style, baseStyle, customStyle);

  // Random direction (0°–180° so keyspell flies upward)
  const angle = Math.random() * 180;
  const radians = (angle * Math.PI) / 180;
  const speed = 4 + Math.random() * 3;

  // Starting position
  let x = window.innerWidth / 2;
  let y = window.innerHeight - 180;
  let rotation = 0;

  // Create radial burst particles (representing K8s cluster nodes)
  createK8sRadialBurst(x, y, k8sBlue);

  // Animate main spell movement
  const interval = setInterval(() => {
    x += Math.cos(radians) * speed;
    y -= Math.sin(radians) * speed;
    rotation += 10;
    
    keyspell.style.left = `${x}px`;
    keyspell.style.top = `${y}px`;
    keyspell.style.transform = `rotate(${rotation}deg)`;
    
    // Fade out gradually
    const distanceTraveled = Math.sqrt(
      Math.pow(x - window.innerWidth / 2, 2) + 
      Math.pow(y - (window.innerHeight - 180), 2)
    );
    const opacity = Math.max(0, 1 - (distanceTraveled / 600));
    keyspell.style.opacity = opacity;

    // Remove when off-screen or faded
    if (x < -100 || x > window.innerWidth + 100 || y < -100 || opacity <= 0) {
      clearInterval(interval);
      if (keyspell && keyspell.parentNode) {
        keyspell.remove();
      }
    }
  }, 16);

  // Play sound effect with error handling
  try {
    const audio = new Audio('keyspells/sounds/whoosh.mp3');
    audio.addEventListener('error', () => {
      console.warn('K8s spell audio could not be loaded');
    });
    audio.play().catch(() => {});
  } catch (error) {
    console.warn('K8s spell audio initialization failed:', error.message);
  }
}

// Create radial burst effect (like K8s cluster nodes radiating outward)
function createK8sRadialBurst(centerX, centerY, color) {
  const particleCount = 8; // 8 particles in a radial pattern
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (360 / particleCount) * i;
    const radians = (angle * Math.PI) / 180;
    
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      left: ${centerX}px;
      top: ${centerY}px;
      width: 12px;
      height: 12px;
      background: ${color};
      border-radius: 50%;
      border: 2px solid ${color};
      box-shadow: 0 0 15px ${color};
      pointer-events: none;
      z-index: 999;
      opacity: 1;
    `;
    
    document.body.appendChild(particle);
    
    // Animate particle outward in radial pattern
    let distance = 0;
    let particleRotation = 0;
    const maxDistance = 150;
    const particleSpeed = 5;
    
    const particleInterval = setInterval(() => {
      distance += particleSpeed;
      particleRotation += 15;
      
      const newX = centerX + Math.cos(radians) * distance;
      const newY = centerY + Math.sin(radians) * distance;
      const opacity = Math.max(0, 1 - (distance / maxDistance));
      const scale = 1 + (distance / maxDistance);
      
      particle.style.left = `${newX}px`;
      particle.style.top = `${newY}px`;
      particle.style.opacity = opacity;
      particle.style.transform = `rotate(${particleRotation}deg) scale(${scale})`;
      
      // Remove when animation completes
      if (distance >= maxDistance || opacity <= 0) {
        clearInterval(particleInterval);
        if (particle && particle.parentNode) {
          particle.remove();
        }
      }
    }, 16);
  }
}
