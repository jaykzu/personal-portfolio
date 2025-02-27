document.addEventListener('DOMContentLoaded', function() {
    // Create and append the TV effect elements to the body
    const body = document.body;
    
    // Add screen flicker
    const flicker = document.createElement('div');
    flicker.classList.add('screen-flicker');
    body.appendChild(flicker);
    
    // Add CRT flare effect
    const flare = document.createElement('div');
    flare.classList.add('crt-flare');
    body.appendChild(flare);
    
    // Add controls
    const controls = document.createElement('div');
    controls.classList.add('tv-controls');
    controls.innerHTML = `
        <button class="control-btn" id="toggle-scanlines">Scanlines</button>
        <button class="control-btn" id="toggle-noise">Noise</button>
        <button class="control-btn" id="toggle-glitch">Glitch</button>
    `;
    body.appendChild(controls);
    
    // Add event listeners for controls
    document.getElementById('toggle-scanlines').addEventListener('click', function() {
        body.classList.toggle('scanlines-off');
    });
    
    document.getElementById('toggle-noise').addEventListener('click', function() {
        body.classList.toggle('noise-off');
    });
    
    document.getElementById('toggle-glitch').addEventListener('click', function() {
        body.classList.toggle('glitch-off');
    });
    
    // Add random glitches periodically
    setInterval(addRandomGlitch, 8000);
    
    // Add random PaleNight color flicker occasionally
    setInterval(addPaleNightFlicker, 12000);
});

// Function to create random glitches
function addRandomGlitch() {
    if (Math.random() > 0.2) return; // Only trigger occasionally (20% chance)
    
    const glitch = document.createElement('div');
    glitch.style.position = 'fixed';
    glitch.style.top = Math.random() * 100 + 'vh';
    glitch.style.left = '0';
    glitch.style.width = '100%';
    glitch.style.height = Math.random() * 3 + 'px'; // Thinner lines
    
    // Randomize PaleNight colored glitches with exact colors
    const colors = [
        'rgba(137, 221, 255, 0.15)', // Operator light blue (#89DDFF)
        'rgba(199, 146, 234, 0.15)', // Purple (#C792EA)
        'rgba(255, 83, 112, 0.15)',  // Bright red (#FF5370)
        'rgba(255, 203, 107, 0.15)', // Yellow (#FFCB6B)
        'rgba(130, 170, 255, 0.15)', // Blue (#82AAFF)
        'rgba(195, 232, 141, 0.15)', // Green (#C3E88D)
        'rgba(247, 140, 108, 0.15)'  // Orange (#F78C6C)
    ];
    
    glitch.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    glitch.style.zIndex = '10004';
    glitch.style.pointerEvents = 'none';
    
    document.body.appendChild(glitch);
    
    // Remove after short duration
    setTimeout(() => {
        document.body.removeChild(glitch);
    }, 120);
}

// Function to add Pale Night-specific color flickering effect
function addPaleNightFlicker() {
    if (Math.random() > 0.15) return; // 15% chance
    
    const colorFlicker = document.createElement('div');
    colorFlicker.style.position = 'fixed';
    colorFlicker.style.top = '0';
    colorFlicker.style.left = '0';
    colorFlicker.style.width = '100%';
    colorFlicker.style.height = '100%';
    
    // Randomize from palette
    const colors = [
        'rgba(137, 221, 255, 0.02)', // Operator light blue
        'rgba(199, 146, 234, 0.02)', // Purple
        'rgba(130, 170, 255, 0.02)', // Blue
        'rgba(240, 113, 120, 0.02)', // Pink
        'rgba(255, 83, 112, 0.02)'   // Bright red
    ];
    
    colorFlicker.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    colorFlicker.style.zIndex = '10005';
    colorFlicker.style.pointerEvents = 'none';
    
    document.body.appendChild(colorFlicker);
    
    // Fade out effect
    let opacity = 0.02;
    const fadeInterval = setInterval(() => {
        opacity -= 0.002;
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            document.body.removeChild(colorFlicker);
        } else {
            // Extract the color and update opacity
            let color = colorFlicker.style.backgroundColor;
            color = color.replace(/[^,]+(?=\))/, opacity);
            colorFlicker.style.backgroundColor = color;
        }
    }, 50);
}

// Add a very mild vertical distortion effect occasionally
setInterval(() => {
    if (Math.random() > 0.05) return; // Only 5% chance to happen
    
    const verticalDistortion = document.createElement('div');
    verticalDistortion.style.position = 'fixed';
    verticalDistortion.style.top = '0';
    verticalDistortion.style.left = '0';
    verticalDistortion.style.width = '100%';
    verticalDistortion.style.height = '100%';
    verticalDistortion.style.backgroundColor = 'transparent';
    verticalDistortion.style.transform = `skewY(${(Math.random() * 1 - 0.5)/20}deg)`; // Very subtle effect
    verticalDistortion.style.zIndex = '10005';
    verticalDistortion.style.pointerEvents = 'none';
    
    document.body.appendChild(verticalDistortion);
    
    // Reset after brief moment
    setTimeout(() => {
        document.body.removeChild(verticalDistortion);
    }, 150);
}, 15000);

// specific effect: Occasional horizontal sync issue with colored glow
setInterval(() => {
    if (Math.random() > 0.03) return; // Very rare chance (3%)
    
    const hSyncIssue = document.createElement('div');
    hSyncIssue.style.position = 'fixed';
    hSyncIssue.style.top = Math.random() * 100 + 'vh';
    hSyncIssue.style.left = '0';
    hSyncIssue.style.width = '100%';
    hSyncIssue.style.height = '1px';
    
    // Randomize the glow color from palette
    const glowColors = [
        'rgba(137, 221, 255, 0.4)', // Operator light blue (#89DDFF)
        'rgba(199, 146, 234, 0.4)', // Purple (#C792EA)
        'rgba(255, 83, 112, 0.4)',  // Bright red (#FF5370)
        'rgba(130, 170, 255, 0.4)'  // Blue (#82AAFF)
    ];
    
    const glowColor = glowColors[Math.floor(Math.random() * glowColors.length)];
    hSyncIssue.style.boxShadow = `0 0 5px 3px ${glowColor}`;
    hSyncIssue.style.backgroundColor = 'rgba(166, 172, 205, 0.5)'; // foreground
    hSyncIssue.style.zIndex = '10006';
    hSyncIssue.style.pointerEvents = 'none';
    
    document.body.appendChild(hSyncIssue);
    
    // Remove quickly
    setTimeout(() => {
        document.body.removeChild(hSyncIssue);
    }, 100);
}, 20000);

// Occasional code-like highlight row effect
setInterval(() => {
    if (Math.random() > 0.02) return; // Very rare (2% chance)
    
    const highlightLine = document.createElement('div');
    highlightLine.style.position = 'fixed';
    highlightLine.style.top = Math.random() * 100 + 'vh';
    highlightLine.style.left = '0';
    highlightLine.style.width = '100%';
    highlightLine.style.height = Math.random() * 20 + 10 + 'px'; // Line height
    highlightLine.style.backgroundColor = 'rgba(52, 50, 74, 0.5)'; // Highlighted line color
    highlightLine.style.zIndex = '10003';
    highlightLine.style.pointerEvents = 'none';
    
    document.body.appendChild(highlightLine);
    
    // Remove after short duration
    setTimeout(() => {
        document.body.removeChild(highlightLine);
    }, 800);
}, 25000);