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

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

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

// Typing effect for the terminal code block
const typeCode = () => {
    const terminalOutput = document.querySelector('.window-body');
    if (!terminalOutput) return;

    const originalHTML = terminalOutput.innerHTML;
    // We can just add a blinking cursor effect
    setInterval(() => {
        const cursor = terminalOutput.querySelector('.cursor');
        if (cursor) {
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        } else {
            terminalOutput.innerHTML += '<span class="cursor" style="color: #00f0ff;">_</span>';
        }
    }, 500);
}

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

            // Revert back after 3 seconds
            setTimeout(() => {
                contactText.innerText = originalText;
            }, 3000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    typeCode();
});
