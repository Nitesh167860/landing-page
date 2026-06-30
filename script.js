/* ==========================================
   MODERN HEADER SCRIPT
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const header = document.querySelector(".header");

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const themeBtn = document.getElementById("themeBtn");
    const mobileThemeBtn = document.querySelector('.mobile-theme-toggle');
    const overlay = document.querySelector('.overlay');
    const scrollBtn = document.getElementById("scrollTop");

    const navLinks = document.querySelectorAll(".navbar a");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    /*==========================================
      DARK / LIGHT MODE
    ==========================================*/

    const savedTheme = localStorage.getItem("theme");

    function applyTheme(isLight) {
        body.classList.toggle("light", isLight);
        const icon = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        [themeBtn, mobileThemeBtn].forEach(btn => {
            if (btn) {
                btn.innerHTML = icon + ' Theme';
                btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
            }
        });
    }

    if (savedTheme === "light") {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    [themeBtn, mobileThemeBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                const isLight = !body.classList.contains('light');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                applyTheme(isLight);
            });
        }
    });

    /*==========================================
      MOBILE MENU
    ==========================================*/

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isActive = mobileMenu.classList.toggle("active");
            if (overlay) overlay.classList.toggle('active', isActive);
            document.body.classList.toggle('menu-open', isActive);
            menuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            menuBtn.innerHTML = isActive ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });

        if (overlay) {
            overlay.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        }
    }

    /*==========================================
      CLOSE MOBILE MENU
    ==========================================*/

    if (mobileLinks && mobileLinks.length) {
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (mobileMenu) mobileMenu.classList.remove("active");
                if (overlay) overlay.classList.remove('active');
                if (menuBtn) {
                    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
                document.body.classList.remove('menu-open');
            });
        });
    }

    /*==========================================
      CLICK OUTSIDE CLOSE MENU
    ==========================================*/

    document.addEventListener("click", (e) => {
        if (mobileMenu && menuBtn) {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove("active");
                if (overlay) overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    /*==========================================
      STICKY HEADER
    ==========================================*/

    function scrollEffect() {

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

        if (scrollBtn) {
            if (window.scrollY > 400) {
                scrollBtn.classList.add("show");
            } else {
                scrollBtn.classList.remove("show");
            }
        }

    }

    window.addEventListener("scroll", scrollEffect);

    scrollEffect();

    /*==========================================
      SCROLL TO TOP
    ==========================================*/

    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /*==========================================
      ACTIVE NAV LINK
    ==========================================*/

    if (navLinks && navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener("click", function () {
                navLinks.forEach(nav => nav.classList.remove("active"));
                this.classList.add("active");
            });
        });
    }

    /*==========================================
      SEARCH
    ==========================================*/

    const searchInput =
        document.querySelector(".search-box input");

    if (searchInput) {

        searchInput.addEventListener("focus", () => {

            document.querySelector(".search-box").style.transform =
                "scale(1.04)";

        });

        searchInput.addEventListener("blur", () => {

            document.querySelector(".search-box").style.transform =
                "scale(1)";

        });

    }

    /*==========================================
      USER DROPDOWN
    ==========================================*/

    const userBtn =
        document.querySelector(".user-btn");

    const userDrop =
        document.querySelector(".user-dropdown");

    if (userBtn && userDrop) {
        userBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            userDrop.classList.toggle("open");
        });

        document.addEventListener("click", (ev) => {
            if (!userDrop.contains(ev.target) && !userBtn.contains(ev.target)) {
                userDrop.classList.remove("open");
            }
        });
    }

    /*==========================================
      HEADER SHADOW
    ==========================================*/

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 15px 35px rgba(0,0,0,.25)";

        } else {

            header.style.boxShadow = "none";

        }

    });

});
