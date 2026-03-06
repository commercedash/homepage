// Commerce Dash - Vanilla JS for UI interactions

document.addEventListener('DOMContentLoaded', () => {
    const hubspotPortalId = '245451684';

    // Load HubSpot tracking once from shared JS so it applies across every page.
    if (!document.getElementById('hs-script-loader')) {
        const hsScript = document.createElement('script');
        hsScript.type = 'text/javascript';
        hsScript.id = 'hs-script-loader';
        hsScript.async = true;
        hsScript.defer = true;
        hsScript.src = `//js-na2.hs-scripts.com/${hubspotPortalId}.js`;
        document.head.appendChild(hsScript);
    }

    const mobileBreakpoint = window.matchMedia('(max-width: 980px)');

    // Inject a menu toggle for each header so all pages share mobile navigation behavior.
    const headerContainers = document.querySelectorAll('.site-header .container');
    headerContainers.forEach((container, index) => {
        const nav = container.querySelector('.main-nav');
        if (!nav) return;

        const navId = nav.id || `site-nav-${index + 1}`;
        nav.id = navId;

        let toggle = container.querySelector('.nav-toggle');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'nav-toggle';
            toggle.setAttribute('aria-controls', navId);
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Menu';
            container.insertBefore(toggle, nav);
        }

        const closeNav = () => {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        };

        toggle.addEventListener('click', () => {
            const willOpen = !nav.classList.contains('is-open');
            nav.classList.toggle('is-open', willOpen);
            toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (mobileBreakpoint.matches) {
                    closeNav();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!mobileBreakpoint.matches) return;
            if (!container.contains(event.target)) {
                closeNav();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeNav();
            }
        });

        mobileBreakpoint.addEventListener('change', (event) => {
            if (!event.matches) {
                closeNav();
            }
        });
    });

    // Reveal content as it enters viewport for a smoother, modern feel.
    const revealTargets = document.querySelectorAll(
        '.bg-light, .value-prop-section, .card, .inline-panel, .comparison-table, .legal-content'
    );

    if ('IntersectionObserver' in window && revealTargets.length) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
        );

        revealTargets.forEach((el) => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
    }

    console.log('Commerce Dash site loaded successfully.');
});
