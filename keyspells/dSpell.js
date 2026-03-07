// Docker-themed D key spell with official color and container block animation
// Uses Docker official color: #2496ED (blue)
// Creates a floating container block effect representing Docker containers

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'd') {
    castDKeyspell();
  }
});

function castDKeyspell() {
  // Docker official color
  const dockerBlue = '#2496ED';
  
  // Create main spell container (representing a Docker container)
  const keyspell = document.createElement('div');
  keyspell.classList.add('keyspell');
  document.body.appendChild(keyspell);

  // Base style: Docker container block shape
  const baseStyle = {
    position: "absolute",
    bottom: "150px",
    left: "50%",
    width: "28px",
    height: "20px",
    borderRadius: "4px",
    background: dockerBlue,
  };

  // Docker-themed custom styling
  const customStyle = {
    boxShadow: `0 0 20px ${dockerBlue}, 0 0 40px ${dockerBlue}60`,
    border: `2px solid ${dockerBlue}`,
    transform: "scale(1)",
    zIndex: "1000",
    opacity: "1"
  };

  // Create CSS animations for Docker spell
  if (!document.getElementById('docker-spell-styles')) {
    const style = document.createElement('style');
    style.id = 'docker-spell-styles';
    style.textContent = `
      @keyframes dockerFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes dockerStack {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-80px) scale(0.8); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Apply styles
  Object.assign(keyspell.style, baseStyle, customStyle);

  // Random direction (0°–180° so keyspell flies upward)
  const angle = Math.random() * 180;
  const radians = (angle * Math.PI) / 180;
  const speed = 3.5 + Math.random() * 3;

  // Starting position
  let x = window.innerWidth / 2;
  let y = window.innerHeight - 180;
  let floatOffset = 0;

  // Create stacked container blocks (representing Docker container layers)
  createDockerContainerStack(x, y, dockerBlue);

  // Animate main spell movement with floating effect
  const interval = setInterval(() => {
    x += Math.cos(radians) * speed;
    y -= Math.sin(radians) * speed;
    floatOffset += 0.1;
    
    // Add floating wave motion
    const floatY = Math.sin(floatOffset) * 5;
    
    keyspell.style.left = `${x}px`;
    keyspell.style.top = `${y + floatY}px`;
    
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
      console.warn('Docker spell audio could not be loaded');
    });
    audio.play().catch(() => {});
  } catch (error) {
    console.warn('Docker spell audio initialization failed:', error.message);
  }
}

// Create stacked container blocks (representing Docker layers)
function createDockerContainerStack(centerX, centerY, color) {
  const containerCount = 5;
  
  for (let i = 0; i < containerCount; i++) {
    setTimeout(() => {
      const container = document.createElement('div');
      const offsetX = (Math.random() - 0.5) * 40;
      
      container.style.cssText = `
        position: absolute;
        left: ${centerX + offsetX}px;
        top: ${centerY}px;
        width: ${20 + Math.random() * 15}px;
        height: ${12 + Math.random() * 8}px;
        background: ${color};
        border-radius: 3px;
        border: 2px solid ${color};
        box-shadow: 0 0 15px ${color}80;
        pointer-events: none;
        z-index: 998;
        opacity: 0.9;
      `;
      
      document.body.appendChild(container);
      
      // Animate container floating upward and fading
      let containerY = centerY;
      let containerOpacity = 0.9;
      let containerScale = 1;
      const riseSpeed = 2 + Math.random() * 2;
      
      const containerInterval = setInterval(() => {
        containerY -= riseSpeed;
        containerOpacity -= 0.015;
        containerScale -= 0.01;
        
        container.style.top = `${containerY}px`;
        container.style.opacity = Math.max(0, containerOpacity);
        container.style.transform = `scale(${Math.max(0.3, containerScale)})`;
        
        // Remove when animation completes
        if (containerY < centerY - 120 || containerOpacity <= 0) {
          clearInterval(containerInterval);
          if (container && container.parentNode) {
            container.remove();
          }
        }
      }, 16);
    }, i * 80);
  }
  
  // Add small particles representing microservices
  createDockerParticles(centerX, centerY, color);
}

// Create small particles (representing microservices/processes)
function createDockerParticles(centerX, centerY, color) {
  const particleCount = 12;
  
  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      const angle = Math.random() * 360;
      const radians = (angle * Math.PI) / 180;
      const speed = 2 + Math.random() * 3;
      
      particle.style.cssText = `
        position: absolute;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 8px ${color};
        pointer-events: none;
        z-index: 997;
        opacity: 1;
      `;
      
      document.body.appendChild(particle);
      
      let distance = 0;
      const maxDistance = 80;
      
      const particleInterval = setInterval(() => {
        distance += speed;
        const newX = centerX + Math.cos(radians) * distance;
        const newY = centerY + Math.sin(radians) * distance;
        const opacity = Math.max(0, 1 - (distance / maxDistance));
        
        particle.style.left = `${newX}px`;
        particle.style.top = `${newY}px`;
        particle.style.opacity = opacity;
        
        if (distance >= maxDistance || opacity <= 0) {
          clearInterval(particleInterval);
          if (particle && particle.parentNode) {
            particle.remove();
          }
        }
      }, 16);
    }, i * 50);
  }
}
