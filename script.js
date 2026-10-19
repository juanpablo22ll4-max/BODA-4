/* =========================================================
   THE FOREVER EDITION
   MODERN LUXURY WEDDING
   FLORES ROJA DESIGN
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    function hidePreloader() {

        if (!preloader) return;

        preloader.classList.add("hidden");

        setTimeout(() => {

            preloader.remove();

        }, 900);

    }

    if (document.readyState === "complete") {

        setTimeout(hidePreloader, 700);

    } else {

        window.addEventListener(
            "load",
            () => setTimeout(hidePreloader, 700),
            { once: true }
        );

    }

    // Evita que el preloader quede bloqueado
    // si alguna imagen tarda demasiado en cargar.

    setTimeout(hidePreloader, 4000);



    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    const backToTop = document.getElementById("backToTop");

    function updateHeader() {

        const scrollY = window.scrollY;

        if (header) {

            header.classList.toggle(
                "scrolled",
                scrollY > 70
            );

        }

        if (backToTop) {

            backToTop.classList.toggle(
                "visible",
                scrollY > 500
            );

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");

    const mobileNav = document.getElementById("mobileNav");

    const mobileLinks = document.querySelectorAll(
        ".mobile-nav a"
    );

    function closeMenu() {

        if (!menuToggle || !mobileNav) return;

        menuToggle.classList.remove("active");

        mobileNav.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        document.body.classList.remove("no-scroll");

    }

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mobileNav.classList.toggle(
                "active"
            );

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

            document.body.classList.toggle(
                "no-scroll",
                isOpen
            );

            if (isOpen) {

                mobileNav.querySelector("a")?.focus();

            }

        });

    }

    mobileLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            closeMenu();

            target.scrollIntoView({

                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth",

                block: "start"

            });

        });

    });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {

                threshold: 0.08,

                rootMargin: "0px 0px -30px 0px"

            }

        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }



    /* =====================================================
       WEDDING COUNTDOWN
    ===================================================== */

    /*
       Wedding:
       June 19, 2027
       4:30 PM
       Chicago time

       June is daylight saving time in Chicago.
       UTC offset: -05:00
    */

    const weddingDate = new Date(
        "2027-06-19T16:30:00-05:00"
    ).getTime();


    const daysElement = document.getElementById("days");

    const hoursElement = document.getElementById("hours");

    const minutesElement = document.getElementById("minutes");

    const secondsElement = document.getElementById("seconds");


    function formatNumber(number, digits = 2) {

        return String(number).padStart(digits, "0");

    }


    function updateCountdown() {

        const now = Date.now();

        const distance = weddingDate - now;


        if (distance <= 0) {

            if (daysElement) daysElement.textContent = "000";

            if (hoursElement) hoursElement.textContent = "00";

            if (minutesElement) minutesElement.textContent = "00";

            if (secondsElement) secondsElement.textContent = "00";

            clearInterval(countdownInterval);

            return;

        }


        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );


        const hours = Math.floor(
            (distance / (1000 * 60 * 60)) % 24
        );


        const minutes = Math.floor(
            (distance / (1000 * 60)) % 60
        );


        const seconds = Math.floor(
            (distance / 1000) % 60
        );


        if (daysElement) {

            daysElement.textContent = formatNumber(
                days,
                3
            );

        }


        if (hoursElement) {

            hoursElement.textContent = formatNumber(
                hours
            );

        }


        if (minutesElement) {

            minutesElement.textContent = formatNumber(
                minutes
            );

        }


        if (secondsElement) {

            secondsElement.textContent = formatNumber(
                seconds
            );

        }

    }


    const countdownInterval = setInterval(
        updateCountdown,
        1000
    );

    updateCountdown();



    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const lightbox = document.getElementById("lightbox");

    const lightboxImage = document.getElementById(
        "lightboxImage"
    );

    const lightboxClose = document.getElementById(
        "lightboxClose"
    );

    const lightboxPrev = document.getElementById(
        "lightboxPrev"
    );

    const lightboxNext = document.getElementById(
        "lightboxNext"
    );

    const lightboxCounter = document.getElementById(
        "lightboxCounter"
    );


    let currentImageIndex = 0;

    let previousFocus = null;


    function updateLightbox() {

        const currentItem = galleryItems[currentImageIndex];

        if (!currentItem || !lightboxImage) return;

        const imagePath = currentItem.dataset.image;

        const thumbnail = currentItem.querySelector("img");

        lightboxImage.src = imagePath;

        lightboxImage.alt = thumbnail?.alt || "Wedding photograph";


        if (lightboxCounter) {

            const current = String(
                currentImageIndex + 1
            ).padStart(2, "0");

            const total = String(
                galleryItems.length
            ).padStart(2, "0");

            lightboxCounter.textContent =
                `${current} / ${total}`;

        }

    }


    function openLightbox(index) {

        if (!lightbox) return;

        previousFocus = document.activeElement;

        currentImageIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("no-scroll");

        lightboxClose?.focus();

    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("no-scroll");

        if (previousFocus instanceof HTMLElement) {

            previousFocus.focus();

        }

    }


    function nextImage() {

        currentImageIndex =
            (currentImageIndex + 1) % galleryItems.length;

        updateLightbox();

    }


    function previousImage() {

        currentImageIndex =
            (
                currentImageIndex
                - 1
                + galleryItems.length
            ) % galleryItems.length;

        updateLightbox();

    }


    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    lightboxClose?.addEventListener(
        "click",
        closeLightbox
    );


    lightboxNext?.addEventListener(
        "click",
        nextImage
    );


    lightboxPrev?.addEventListener(
        "click",
        previousImage
    );


    lightbox?.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    document.addEventListener("keydown", event => {

        if (
            !lightbox ||
            !lightbox.classList.contains("active")
        ) {

            if (
                event.key === "Escape" &&
                mobileNav?.classList.contains("active")
            ) {

                closeMenu();

                menuToggle?.focus();

            }

            return;

        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            nextImage();

        }


        if (event.key === "ArrowLeft") {

            previousImage();

        }


        if (event.key === "Tab") {

            const focusable = [

                lightboxClose,
                lightboxPrev,
                lightboxNext

            ].filter(Boolean);

            const first = focusable[0];

            const last = focusable[focusable.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === first
            ) {

                event.preventDefault();

                last.focus();

            } else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {

                event.preventDefault();

                first.focus();

            }

        }

    });



    /* =====================================================
       RSVP FORM — DEMO MODE
    ===================================================== */

    /*
       IMPORTANT:

       This is a demonstration form.

       It validates the information and displays
       a confirmation message.

       It does NOT send or save responses yet.

       Later, it can be connected to Firebase
       Firestore, a form service, or another backend.
    */


    const rsvpForm = document.getElementById("rsvpForm");

    const formMessage = document.getElementById(
        "formMessage"
    );

    const attendanceSelect = document.getElementById(
        "attendance"
    );

    const guestCountSelect = document.getElementById(
        "guestCount"
    );


    function updateGuestCount() {

        if (
            !attendanceSelect ||
            !guestCountSelect
        ) return;


        if (attendanceSelect.value === "no") {

            guestCountSelect.value = "1";

            guestCountSelect.disabled = true;

            guestCountSelect.required = false;

        } else {

            guestCountSelect.disabled = false;

            guestCountSelect.required = true;

        }

    }


    attendanceSelect?.addEventListener(
        "change",
        updateGuestCount
    );


    rsvpForm?.addEventListener("submit", event => {

        event.preventDefault();


        if (!rsvpForm.checkValidity()) {

            rsvpForm.reportValidity();

            return;

        }


        const name = document.getElementById(
            "guestName"
        ).value.trim();


        const attendance = attendanceSelect.value;


        if (!name) {

            formMessage.textContent =
                "Please enter your full name.";

            formMessage.style.color = "#a94442";

            return;

        }


        if (attendance === "yes") {

            formMessage.textContent =
                `Thank you, ${name}! Your RSVP demo is complete. This preview does not send your response.`;

        } else {

            formMessage.textContent =
                `Thank you, ${name}. Your RSVP demo is complete. This preview does not send your response.`;

        }


        formMessage.style.color = "#55745b";


        rsvpForm.reset();

        updateGuestCount();

    });



    /* =====================================================
       IMAGE LOADING
    ===================================================== */

    const lazyImages = document.querySelectorAll(
        'img[loading="lazy"]'
    );

    lazyImages.forEach(image => {

        image.addEventListener("load", () => {

            image.classList.add("loaded");

        });

    });



    /* =====================================================
       INITIALIZE
    ===================================================== */

    console.log(
        "The Forever Edition — Flores Roja Design"
    );

});