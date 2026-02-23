// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Progressive Scroll Reveal Animation with IntersectionObserver
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Navbar background blur on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(5, 5, 8, 0.9)";
        navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
    } else {
        navbar.style.background = "rgba(5, 5, 8, 0.7)";
        navbar.style.boxShadow = "none";
    }
});

// Realistic Typing effect for the terminal code block
const typeCode = () => {
    const codeBlock = document.querySelector('.window-body pre code');
    if (!codeBlock) return;

    const commands = [
        { text: 'root@server:~# echo "Tech Savvy"', output: '<span class="output">Tech Savvy</span>', delay: 800 },
        { text: 'root@server:~# ./deploy_app.sh --target=SmartbusSkopje', output: '<span class="output">Building... [OK]</span>', delay: 1500 },
        { text: 'root@server:~# systemctl status apache2', output: '<span class="output green-text">● apache2.service - The Apache Webserver\\n   Active: active (running)</span>', delay: 1000 }
    ];

    codeBlock.innerHTML = '';
    let currentCmdIndex = 0;

    const typeCommand = (cmdObj) => {
        if (currentCmdIndex >= commands.length) {
            codeBlock.innerHTML += '\\nroot@server:~# <span class="cursor" style="color: #00f0ff; animation: blink 1s step-end infinite;">_</span>';
            return;
        }

        let i = 0;
        let line = document.createElement('div');
        codeBlock.appendChild(line);

        const typingInterval = setInterval(() => {
            line.innerHTML = cmdObj.text.substring(0, i) + '<span class="cursor" style="color: #00f0ff; opacity: 0.8;">_</span>';
            i++;
            if (i > cmdObj.text.length) {
                clearInterval(typingInterval);
                line.innerHTML = cmdObj.text; // remove cursor

                setTimeout(() => {
                    if (cmdObj.output) {
                        const outputDiv = document.createElement('div');
                        outputDiv.innerHTML = cmdObj.output;
                        codeBlock.appendChild(outputDiv);
                    }
                    currentCmdIndex++;
                    setTimeout(() => typeCommand(commands[currentCmdIndex]), 200);
                }, cmdObj.delay);
            }
        }, 30);
    };

    setTimeout(() => typeCommand(commands[currentCmdIndex]), 1000);
};

// Glitch Text Hover Effect
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.addEventListener('mouseover', () => {
        glitchText.style.animation = 'glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite';
    });
    glitchText.addEventListener('mouseout', () => {
        glitchText.style.animation = 'none';
        glitchText.style.transform = 'none';
    });
}

// Setup basic keyframes dynamically for glitch if needed, or rely on CSS. Let's rely on inline injection for cool glitch.
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch-skew {
        0% { transform: skew(0deg); }
        20% { transform: skew(-20deg); }
        40% { transform: skew(20deg); }
        60% { transform: skew(-10deg); }
        80% { transform: skew(10deg); }
        100% { transform: skew(0deg); }
    }
`;
document.head.appendChild(style);

// Contact Button Copy to Clipboard
const contactBtn = document.getElementById('contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        const email = 'davkilerthej@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const contactText = document.getElementById('contact-text');
            const originalText = contactText.innerText;
            contactText.innerText = 'Copied to Clipboard!';
            setTimeout(() => contactText.innerText = originalText, 3000);
        }).catch(err => console.error('Could not copy text: ', err));
    });
}

// Interactive Blobs
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let blob1X = 0, blob1Y = 0;
let blob2X = 0, blob2Y = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateBlobs() {
    // Only animate if not highly restricted by performance
    if (window.innerWidth > 768) {
        blob1X += (mouseX - blob1X) * 0.05;
        blob1Y += (mouseY - blob1Y) * 0.05;
        blob2X += (mouseX - blob2X) * 0.03;
        blob2Y += (mouseY - blob2Y) * 0.03;

        if (blob1) blob1.style.transform = `translate(${blob1X * 0.05}px, ${blob1Y * 0.05}px)`;
        if (blob2) blob2.style.transform = `translate(${blob2X * -0.05}px, ${blob2Y * -0.05}px)`;
    }
    requestAnimationFrame(animateBlobs);
}
requestAnimationFrame(animateBlobs);

// 3D Card Tilt Effect
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Disable on mobile/touch
        if (window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 768) return;
        card.style.transition = 'transform 0.5s ease, border-color 0.4s ease, box-shadow 0.4s ease';
        card.style.transform = '';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    typeCode();
});
