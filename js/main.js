/* ============================================
   CUGNOT PHOTOGRAPHY v2.0 - Main JavaScript
   Movie Intro | Cyberpunk Effects | Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // MOVIE INTRO - NARRATION SEQUENCE
    // ============================================
    const intro = document.getElementById('movie-intro');
    const studioLogo = document.getElementById('studio-logo');
    const narrationContainer = document.getElementById('narration-container');
    const narrationText = document.getElementById('narration-text');
    const narrationCursor = document.getElementById('narration-cursor');
    const mainWebsite = document.getElementById('main-website');
    const skipBtn = document.getElementById('skip-intro');

    // The story narration - old-timey mystery narrator style
    const storyLines = [
        { text: "In the year of our Lord 2026...", delay: 500, speed: 60 },
        { text: "In a city where concrete dreams meet golden sunsets...", delay: 800, speed: 55 },
        { text: "There exists a craftsman who doesn't merely take pictures...", delay: 700, speed: 50 },
        { text: "<em>He steals moments from time itself.</em>", delay: 600, speed: 70 },
        { text: "", delay: 400, speed: 0 },
        { text: "Through the bustling streets of Nairobi...", delay: 600, speed: 55 },
        { text: "Where the old world collides with the new...", delay: 600, speed: 55 },
        { text: "One name echoes through the corridors of memory...", delay: 700, speed: 50 },
        { text: "", delay: 300, speed: 0 },
        { text: "<strong>CUGNOT ARTS.</strong>", delay: 1000, speed: 100 },
        { text: "", delay: 500, speed: 0 },
        { text: "Born from concrete poetry...", delay: 600, speed: 55 },
        { text: "Forged in the fires of a thousand sunsets...", delay: 600, speed: 55 },
        { text: "He captures not just images...", delay: 500, speed: 60 },
        { text: "<em>But the very soul behind every smile.</em>", delay: 700, speed: 65 },
        { text: "", delay: 400, speed: 0 },
        { text: "From sacred wedding vows...", delay: 500, speed: 60 },
        { text: "To proud graduation strides...", delay: 500, speed: 60 },
        { text: "From tender baby bumps...", delay: 500, speed: 60 },
        { text: "To wild birthday celebrations...", delay: 500, speed: 60 },
        { text: "", delay: 300, speed: 0 },
        { text: "Every frame is a love letter to life itself.", delay: 800, speed: 55 },
        { text: "", delay: 500, speed: 0 },
        { text: "Ladies and gentlemen...", delay: 600, speed: 70 },
        { text: "Welcome to the world of...", delay: 600, speed: 65 },
        { text: "<strong style=\"color: #00ff88; text-shadow: 0 0 20px rgba(0,255,136,0.5);\">CUGNOT PHOTOGRAPHY</strong>", delay: 1200, speed: 80 }
    ];

    let currentLine = 0;
    let isTyping = false;
    let introSkipped = false;

    function typeLine() {
        if (introSkipped) return;

        if (currentLine >= storyLines.length) {
            // End of intro - fade out and show website
            setTimeout(() => {
                endIntro();
            }, 2000);
            return;
        }

        const line = storyLines[currentLine];

        if (line.text === "") {
            narrationText.innerHTML = "";
            currentLine++;
            setTimeout(typeLine, line.delay);
            return;
        }

        narrationText.innerHTML = "";
        narrationContainer.classList.add('visible');
        isTyping = true;

        let charIndex = 0;
        const text = line.text;

        function typeChar() {
            if (introSkipped) return;

            if (charIndex < text.length) {
                narrationText.innerHTML = text.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeChar, line.speed);
            } else {
                isTyping = false;
                currentLine++;
                setTimeout(typeLine, line.delay);
            }
        }

        typeChar();
    }

    function endIntro() {
        if (introSkipped) return;
        introSkipped = true;

        intro.classList.add('hidden');
        mainWebsite.classList.remove('hidden');

        // Start hero typewriter
        setTimeout(() => {
            typeHeroSubtitle();
        }, 1000);

        // Initialize particles
        initParticles();
    }

    // Start intro after logo animation
    setTimeout(() => {
        studioLogo.style.display = 'none';
        typeLine();
    }, 3500);

    // Skip intro function
    window.skipIntro = function() {
        introSkipped = true;
        intro.classList.add('hidden');
        mainWebsite.classList.remove('hidden');
        typeHeroSubtitle();
        initParticles();
    };

    // Auto-skip after 30 seconds
    setTimeout(() => {
        if (!introSkipped) {
            skipIntro();
        }
    }, 30000);

    // ============================================
    // HERO TYPEWRITER
    // ============================================
    const heroTypewriter = document.getElementById('hero-typewriter');
    const heroTexts = [
        "Where every frame tells a story...",
        "Where light meets shadow...",
        "Where moments become eternal...",
        "Welcome to the art of visual storytelling."
    ];
    let heroTextIndex = 0;

    function typeHeroSubtitle() {
        if (!heroTypewriter) return;

        const text = heroTexts[heroTextIndex];
        let charIndex = 0;
        heroTypewriter.textContent = "";

        function typeChar() {
            if (charIndex < text.length) {
                heroTypewriter.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            } else {
                setTimeout(() => {
                    heroTextIndex = (heroTextIndex + 1) % heroTexts.length;
                    typeHeroSubtitle();
                }, 3000);
            }
        }

        typeChar();
    }

    // ============================================
    // PARTICLES CANVAS
    // ============================================
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 136, ' + this.opacity + ')';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = 'rgba(0, 255, 136, ' + (0.1 * (1 - dist / 150)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // ============================================
    // NAVBAR SCROLL
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.borderBottomColor = 'rgba(0, 255, 136, 0.2)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.borderBottomColor = 'rgba(0, 255, 136, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SCROLL REVEAL
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number-cyber');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.dataset.target);
                const suffix = target.textContent.replace(/[0-9]/g, '');

                animateCounter(target, 0, targetValue, 2000, suffix);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    function animateCounter(element, start, end, duration, suffix) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            element.textContent = current + (suffix || '+');

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ============================================
    // GALLERY THUMBS
    // ============================================
    const thumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('gallery-main-img');
    const captionTitle = document.querySelector('#gallery-caption h3');
    const captionDesc = document.querySelector('#gallery-caption p');
    const captionTag = document.querySelector('.caption-tag');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            const newSrc = thumb.querySelector('img').src;
            mainImg.style.opacity = '0';

            setTimeout(() => {
                mainImg.src = newSrc;
                captionTitle.textContent = thumb.dataset.title;
                captionDesc.textContent = thumb.dataset.desc;
                captionTag.textContent = thumb.dataset.file;
                mainImg.style.opacity = '1';
            }, 300);
        });
    });

    // ============================================
    // COPY TO CLIPBOARD
    // ============================================
    document.querySelectorAll('.pay-value').forEach(el => {
        el.addEventListener('click', () => {
            const text = el.dataset.copy;
            navigator.clipboard.writeText(text).then(() => {
                const original = el.innerHTML;
                el.innerHTML = text + ' <i class="fas fa-check"></i>';
                el.style.color = '#00ff88';

                setTimeout(() => {
                    el.innerHTML = original;
                    el.style.color = '';
                }, 2000);
            });
        });
    });

    // ============================================
    // MOBILE NAV TOGGLE
    // ============================================
    window.toggleNav = function() {
        const navLinks = document.querySelector('.nav-links-cyber');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(5, 5, 5, 0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid rgba(0, 255, 136, 0.2)';
        }
    };

    // ============================================
    // GLITCH EFFECT ON SCROLL
    // ============================================
    const glitchElement = document.querySelector('.glitch');
    let glitchTimeout;

    window.addEventListener('scroll', () => {
        if (glitchElement) {
            glitchElement.style.animation = 'none';
            clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => {
                glitchElement.style.animation = '';
            }, 100);
        }
    });

    console.log('🎬 Cugnot Photography v2.0 loaded. Enjoy the show.');
});
