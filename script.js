// No JavaScript needed for the basic image-based functionality\n// The CSS handles all animations and hover effects

document.addEventListener('DOMContentLoaded', () => {
    // Initial delay to let the page load
    setTimeout(createShootingStar, 1000);
    
    // Create stars for the background
    createBackgroundStars();
});

function createShootingStar() {
    // Create wrapper element
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Create star element (the actual shooting star with trail)
    const star = document.createElement('div');
    star.className = 'star';
    shootingStar.appendChild(star);
    
    // Random position - anywhere in the container
    const randomTop = Math.random() * 70 + 5; // 5-75% from top
    const randomLeft = Math.random() * 60 + 5; // 5-65% from left (room for animation)
    
    shootingStar.style.top = `${randomTop}%`;
    shootingStar.style.left = `${randomLeft}%`;
    
    // Random angle (mostly horizontal but sometimes angled down)
    const isDownward = Math.random() > 0.7; // 30% chance of downward trajectory
    const angle = isDownward 
        ? Math.random() * 20 + 5  // 5 to 25 degrees downward
        : Math.random() * 10 - 5; // -5 to 5 degrees (mostly horizontal)
    
    shootingStar.style.transform = `rotate(${angle}deg)`;
    
    // Add to container
    document.querySelector('.container').appendChild(shootingStar);
    
    // Start animation
    const animationDistance = 100 + Math.random() * 50; // Variable distance
    const animationDuration = 4 + Math.random() * 3; // 4-7 seconds total animation
    
    // Adjust animation: Fade out before the final movement part
    // Visible duration is roughly 15% of the total animation time (e.g., 0.6s to 1.05s)
    const visibleOffset = 0.15;
    
    shootingStar.animate([
        { opacity: 0, transform: `rotate(${angle}deg) translateX(0)` },
        { opacity: 1, transform: `rotate(${angle}deg) translateX(${animationDistance * 0.05}px)`, offset: 0.05 }, // Fade in early
        { opacity: 1, transform: `rotate(${angle}deg) translateX(${animationDistance * visibleOffset}px)`, offset: visibleOffset }, // Hold full opacity
        { opacity: 0, transform: `rotate(${angle}deg) translateX(${animationDistance * visibleOffset * 1.1}px)`, offset: visibleOffset + 0.05 }, // Fade out
        { opacity: 0, transform: `rotate(${angle}deg) translateX(${animationDistance}px)` }
    ], {
        duration: animationDuration * 1000,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        fill: 'forwards'
    });
    
    // Clean up DOM after animation completes
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, animationDuration * 1000 + 100);
    
    // Schedule next shooting star
    const nextDelay = Math.random() * 2000 + 2000; // 2-4 seconds
    setTimeout(createShootingStar, nextDelay);
}

// Function to dynamically create background stars
function createBackgroundStars() {
    const container = document.querySelector('.container');
    const numStars = 300; // Increase number of stars significantly
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'background-star';
        
        // Random size (0.5px to 1.5px)
        const size = Math.random() * 1 + 0.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        // Random opacity for depth (0.3 to 0.8)
        star.style.opacity = Math.random() * 0.5 + 0.3;
        
        // Add to container
        container.appendChild(star);
    }
}
