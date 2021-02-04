"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const header = document.querySelector(".header");
const message = document.createElement("div");

const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const allSections = document.querySelectorAll(".section");

const imgTargets = document.querySelectorAll("img[data-src]");

// Page Navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

// Smooth Scrolling
btnScrollTo.addEventListener("click", function (e) {
    section1.scrollIntoView({ behavior: "smooth" });
});

// Modal window
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// Cookie Message
message.classList.add("cookie-message");
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>`;
header.append(message);

document.querySelector(".btn--close-cookie").addEventListener("click", function () {
    message.remove();
});

message.style.backgroundColor = "#37383d";
message.style.width = "120%";
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// Menu fade animation
const handleHover = function (e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");
        siblings.forEach((el) => {
            if (el != link) {
                el.style.opacity = this;
            }
        });
        logo.style.opacity = this;
    }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Tabbed Component
tabContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");

    if (!clicked) return;

    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");

    tabsContent.forEach((tab) => tab.classList.remove("operations__content--active"));

    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active");
});

// Sticky Navigation
const stickyNav = function (entries) {
    // This callback will be called each time the target element is intersecting the root element at the threshold we define
    const [entry] = entries;
    if (!entry.isIntersecting) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
};

const headerOptions = {
    root: null, // element that the target element is intersecting. null = viewport
    threshold: 0, // percentage of intersection at which the obsCallback will be called. can be one or array of more values
    rootMargin: `-${nav.getBoundingClientRect().height}px`, // box that will be applied outside of target element
};

const headerObserver = new IntersectionObserver(stickyNav, headerOptions);
headerObserver.observe(header); // element passed is the target element

// Revealing sections on scroll
const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach((section) => {
    sectionObserver.observe(section);
    // section.classList.add("section--hidden");
});

// Lazy Loading Images
const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", () => {
        entry.target.classList.remove("lazy-img");
    });
    observer.unobserve();
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

// Carousel
const carousel = () => {
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const dotContainer = document.querySelector(".dots");

    let currSlide = 0;
    const maxSlide = slides.length;

    const createDots = function () {
        slides.forEach((_, i) => {
            dotContainer.insertAdjacentHTML(
                "beforeend",
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document.querySelectorAll(".dots__dot").forEach((dot) => {
            dot.classList.remove("dots__dot--active");
        });
        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add("dots__dot--active");
    };

    const goToSlide = function (slide) {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`;
        });
    };

    const nextSlide = function () {
        currSlide = currSlide === maxSlide - 1 ? 0 : currSlide + 1;
        goToSlide(currSlide);
        activateDot(currSlide);
    };

    const prevSlide = function () {
        currSlide = currSlide === 0 ? maxSlide - 1 : currSlide - 1;
        goToSlide(currSlide);
        activateDot(currSlide);
    };

    const init = () => {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    init();

    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
            prevSlide();
        } else if (e.key === "ArrowRight") {
            nextSlide();
        }
    });

    dotContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("dots__dot")) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(currSlide);
        }
    });
};
carousel();
