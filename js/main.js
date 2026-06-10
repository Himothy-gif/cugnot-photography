document.addEventListener('DOMContentLoaded', function() {
    const intro = document.getElementById('movie-intro');
    const studioLogo = document.getElementById('studio-logo');
    const narrationContainer = document.getElementById('narration-container');
    const narrationText = document.getElementById('narration-text');
    const mainWebsite = document.getElementById('main-website');
    let introSkipped = false;
    let voiceStarted = false;

    const synth = window.speechSynthesis;
    let voices = [];

    function loadVoices() {
        voices = synth.getVoices();
    }
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
    }
    loadVoices();

    const storyLines = [
        {text: "In the year of our Lord 2026...", delay: 500, speed: 60},
        {text: "In a city where concrete dreams meet golden sunsets...", delay: 800, speed: 55},
        {text: "There exists a craftsman who does not merely take pictures...", delay: 700, speed: 50},
        {text: "He steals moments from time itself.", delay: 600, speed: 70, em: true},
        {text: "", delay: 400, speed: 0},
        {text: "Through the bustling streets of Nairobi...", delay: 600, speed: 55},
        {text: "Where the old world collides with the new...", delay: 600, speed: 55},
        {text: "One name echoes through the corridors of memory...", delay: 700, speed: 50},
        {text: "", delay: 300, speed: 0},
        {text: "CUGNOT ARTS.", delay: 1000, speed: 100, strong: true},
        {text: "", delay: 500, speed: 0},
        {text: "Born from concrete poetry...", delay: 600, speed: 55},
        {text: "Forged in the fires of a thousand sunsets...", delay: 600, speed: 55},
        {text: "He captures not just images...", delay: 500, speed: 60},
        {text: "But the very soul behind every smile.", delay: 700, speed: 65, em: true},
        {text: "", delay: 400, speed: 0},
        {text: "From sacred wedding vows...", delay: 500, speed: 60},
        {text: "To proud graduation strides...", delay: 500, speed: 60},
        {text: "From tender baby bumps...", delay: 500, speed: 60},
        {text: "To wild birthday celebrations...", delay: 500, speed: 60},
        {text: "", delay: 300, speed: 0},
        {text: "Every frame is a love letter to life itself.", delay: 800, speed: 55},
        {text: "", delay: 500, speed: 0},
        {text: "Ladies and gentlemen...", delay: 600, speed: 70},
        {text: "Welcome to the world of...", delay: 600, speed: 65},
        {text: "CUGNOT PHOTOGRAPHY", delay: 1200, speed: 80, neon: true}
    ];

    let currentLine = 0;

    function speakText(text) {
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.8;
        utter.pitch = 0.6;
        utter.volume = 1;
        const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('Google US English'));
        if (maleVoice) utter.voice = maleVoice;
        synth.speak(utter);
    }

    function typeLine() {
        if (introSkipped) return;
        if (currentLine >= storyLines.length) {
            setTimeout(endIntro, 2000);
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
        let charIndex = 0;
        function typeChar() {
            if (introSkipped) return;
            if (charIndex < line.text.length) {
                let html = line.text.substring(0, charIndex + 1);
                if (line.em) html = '<em>' + html + '</em>';
                if (line.strong) html = '<strong>' + html + '</strong>';
                if (line.neon) html = '<strong style="color:#00ff88;text-shadow:0 0 20px rgba(0,255,136,0.5)">' + html + '</strong>';
                narrationText.innerHTML = html;
                charIndex++;
                setTimeout(typeChar, line.speed);
            } else {
                if (voiceStarted && line.text.length > 0) speakText(line.text);
                currentLine++;
                setTimeout(typeLine, line.delay);
            }
        }
        typeChar();
    }

    function endIntro() {
        if (introSkipped) return;
        introSkipped = true;
        if (synth) synth.cancel();
        intro.classList.add('hidden');
        mainWebsite.classList.remove('hidden');
        setTimeout(typeHeroSubtitle, 1000);
        initParticles();
    }

    setTimeout(function() {
        studioLogo.style.display = 'none';
        typeLine();
    }, 3500);

    window.startVoice = function() {
        if (voiceStarted) return;
        voiceStarted = true;
        if (storyLines[currentLine] && storyLines[currentLine].text.length > 0) {
            speakText(storyLines[currentLine].text);
        }
    };

    window.skipIntro = function() {
        introSkipped = true;
        if (synth) synth.cancel();
        intro.classList.add('hidden');
        mainWebsite.classList.remove('hidden');
        typeHeroSubtitle();
        initParticles();
    };

    setTimeout(function() {
    }, 45000);

    const heroTypewriter = document.getElementById('hero-typewriter');
    const heroTexts = ["Where every frame tells a story...", "Where light meets shadow...", "Where moments become eternal...", "Welcome to the art of visual storytelling."];
    let heroTextIndex = 0;
    function typeHeroSubtitle() {
        const text = heroTexts[heroTextIndex];
        let charIndex = 0;
        heroTypewriter.textContent = "";
        function typeChar() {
            if (charIndex < text.length) {
                heroTypewriter.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            } else {
                setTimeout(function() {
                    heroTextIndex = (heroTextIndex + 1) % heroTexts.length;
                    typeHeroSubtitle();
                }, 3000);
            }
        }
        typeChar();
    }

    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particles = [];
        const count = 50;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(function(p) {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                    p.x = Math.random() * canvas.width;
                    p.y = Math.random() * canvas.height;
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0,255,136,' + p.opacity + ')';
                ctx.fill();
            });
            particles.forEach(function(p1, i) {
                particles.slice(i + 1).forEach(function(p2) {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = 'rgba(0,255,136,' + (0.1 * (1 - dist / 150)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            requestAnimationFrame(animate);
        }
        animate();
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.style.background = 'rgba(5,5,5,0.95)';
            navbar.style.borderBottomColor = 'rgba(0,255,136,0.2)';
        } else {
            navbar.style.background = 'rgba(5,5,5,0.8)';
            navbar.style.borderBottomColor = 'rgba(0,255,136,0.1)';
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) window.scrollTo({top: t.offsetTop - 80, behavior: 'smooth'});
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(function() {
                    entry.target.classList.add('active');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});
    revealElements.forEach(function(el) {
        revealObserver.observe(el);
    });

    const statNumbers = document.querySelectorAll('.stat-number-cyber');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.dataset.target);
                const suffix = target.textContent.replace(/[0-9]/g, '');
                animateCounter(target, 0, targetValue, 2000, suffix);
                counterObserver.unobserve(target);
            }
        });
    }, {threshold: 0.5});
    statNumbers.forEach(function(stat) {
        counterObserver.observe(stat);
    });

    function animateCounter(element, start, end, duration, suffix) {
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            element.textContent = current + (suffix || '+');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const thumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('gallery-main-img');
    const captionTitle = document.querySelector('#gallery-caption h3');
    const captionDesc = document.querySelector('#gallery-caption p');
    const captionTag = document.querySelector('.caption-tag');
    thumbs.forEach(function(thumb) {
        thumb.addEventListener('click', function() {
            thumbs.forEach(function(t) {
                t.classList.remove('active');
            });
            thumb.classList.add('active');
            mainImg.style.opacity = '0';
            setTimeout(function() {
                mainImg.src = thumb.querySelector('img').src;
                captionTitle.textContent = thumb.dataset.title;
                captionDesc.textContent = thumb.dataset.desc;
                captionTag.textContent = thumb.dataset.file;
                mainImg.style.opacity = '1';
            }, 300);
        });
    });

    document.querySelectorAll('.pay-value').forEach(function(el) {
        el.addEventListener('click', function() {
            const text = el.dataset.copy;
            navigator.clipboard.writeText(text).then(function() {
                const original = el.innerHTML;
                el.innerHTML = text + ' <i class="fas fa-check"></i>';
                el.style.color = '#00ff88';
                setTimeout(function() {
                    el.innerHTML = original;
                    el.style.color = '';
                }, 2000);
            });
        });
    });

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
            navLinks.style.background = 'rgba(5,5,5,0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid rgba(0,255,136,0.2)';
        }
    };

    console.log('Cugnot Photography v2.2 - All features working');
});
