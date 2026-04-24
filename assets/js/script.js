document.addEventListener('DOMContentLoaded', () => {
    // Carousel Logic for Guru Section
    const guruContainer = document.getElementById('guru-container');
    const btnNext = document.getElementById('guru-next');
    const btnPrev = document.getElementById('guru-prev');

    if (guruContainer && btnNext && btnPrev) {
        // Scroll dynamically based on card size + gap
        const getScrollAmount = () => {
            const firstCard = guruContainer.querySelector('.col');
            if (!firstCard) return 300;
            const cardWidth = firstCard.offsetWidth;
            const gap = parseFloat(window.getComputedStyle(guruContainer).gap) || 24; // 24px is roughly g-4
            return cardWidth + gap;
        };

        btnNext.addEventListener('click', () => {
            guruContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            guruContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        // Mouse Drag to Scroll Logic
        let isDown = false;
        let startX;
        let scrollLeft;

        guruContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            guruContainer.style.cursor = 'grabbing';
            startX = e.pageX - guruContainer.offsetLeft;
            scrollLeft = guruContainer.scrollLeft;
        });
        guruContainer.addEventListener('mouseleave', () => {
            isDown = false;
            guruContainer.style.cursor = 'auto';
        });
        guruContainer.addEventListener('mouseup', () => {
            isDown = false;
            guruContainer.style.cursor = 'auto';
        });
        guruContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - guruContainer.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            guruContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // Dynamic AOS Attributes Application
    // Hero Content
    document.querySelectorAll('.hero-content > *').forEach((el, index) => {
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-delay', index * 100);
    });

    // Content Cards Staggered Animation
    document.querySelectorAll('.card, .icon-box, article > img, aside .badge').forEach((card, index) => {
        if (!card.hasAttribute('data-aos')) {
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index % 4) * 100);
        }
    });

    // Main Headings fading down
    document.querySelectorAll('h2.h5, h2.h6, h1.display-5, article > h1').forEach((heading) => {
        if (!heading.closest('.card') && !heading.closest('.hero-content') && !heading.hasAttribute('data-aos')) {
            heading.setAttribute('data-aos', 'fade-down');
        }
    });

    // Footer columns stagger
    document.querySelectorAll('footer .row > div').forEach((col, index) => {
        if (!col.hasAttribute('data-aos')) {
            col.setAttribute('data-aos', 'fade-up');
            col.setAttribute('data-aos-delay', index * 100);
        }
    });

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }
});
