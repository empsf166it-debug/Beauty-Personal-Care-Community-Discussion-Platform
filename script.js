document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Scroll Effect & Active Link ---
    const nav = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        // Header background effect
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active link highlight (ScrollSpy)
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Theme Toggle ---
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                body.removeAttribute('data-theme');
                toggle.innerHTML = '<i class="bi bi-moon"></i>';
                // Update mobile toggle if exists
                themeToggles.forEach(t => t.innerHTML = '<i class="bi bi-moon"></i>');
            } else {
                body.setAttribute('data-theme', 'dark');
                toggle.innerHTML = '<i class="bi bi-sun"></i>';
                themeToggles.forEach(t => t.innerHTML = '<i class="bi bi-sun"></i>');
            }
        });
    });



    // --- 3D Parallax on Hero ---
    const heroVisual = document.querySelector('.hero-visual');
    const objects = document.querySelectorAll('.floating-obj');

    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            objects.forEach((obj, index) => {
                const speed = (index + 1) * 0.5;
                obj.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });

        heroVisual.addEventListener('mouseleave', () => {
            objects.forEach(obj => {
                obj.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    // --- Scroll Animations ---
    const revealElements = document.querySelectorAll('.discussion-card, .expert-card, .ask-form-wrapper, .member-card, .challenge-card');
    
    // Add base reveal class
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // --- Join Challenge Interaction ---
    const joinBtns = document.querySelectorAll('.join-challenge-btn');
    joinBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-success');
            this.innerHTML = '<i class="bi bi-check-lg"></i> Joined';
            
            // Simple confetti effect logic could go here
            const card = this.closest('.challenge-card');
            card.style.transform = 'scale(1.05)';
            setTimeout(() => card.style.transform = '', 200);
        });
    });

    // --- Like Interaction ---
    const likeBtns = document.querySelectorAll('.action-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if(this.innerHTML.includes('heart')) {
                this.classList.toggle('active');
                const icon = this.querySelector('i');
                if(this.classList.contains('active')) {
                    icon.classList.remove('bi-heart');
                    icon.classList.add('bi-heart-fill', 'text-danger');
                } else {
                    icon.classList.add('bi-heart');
                    icon.classList.remove('bi-heart-fill', 'text-danger');
                }
            }
        });
    });

    // --- Magnetic Buttons for CTA ---
    const magneticBtns = document.querySelectorAll('.cta-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Submit Form Interaction ---
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const originalText = this.innerText;
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Posting...';
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-check-lg"></i> Posted to Community';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.add('btn-primary');
                    this.classList.remove('btn-success');
                    document.querySelector('.ask-form-wrapper form').reset();
                }, 3000);
            }, 1500);
        });
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
