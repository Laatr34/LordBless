gsap.registerPlugin(ScrollTrigger);

// INITIALISATION
const fadeEl = document.querySelectorAll(".to-fade");
$.each($(fadeEl), function (_, el) {
  let translateValue = el.dataset.x_translate;

  $(el).css({
    transform: `translateX(${translateValue}px)`,
    opacity: 0,
  });

  gsap.to(el, {
    x: 0,
    duration: 0.8,
    opacity: 1,

    scrollTrigger: {
      trigger: el.parentElement,
      start: "10% 40%",
    },
  });
});

// GENERE UN NOMBRE AU HASARD
function getRandom(max) {
  return Math.floor(Math.random() * max);
}

// ANIMATION DE L'IMAGE DE FOND DE LA SECTION
const objs = $(".hero .bcg-img img");

$.each(objs, function (_, o) {
  let yRandom = getRandom(100);

  gsap.to(o, {
    y: yRandom,
    duration: 0.8,
    rotate: getRandom(180),
  });

  // ANIMATION AU SCROLL
  gsap.to(o, {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      scrub: 3,
    },

    y: yRandom - 200,
  });
});

// EVENEMENT LIEE AU SCROLL
const navBar = document.querySelector(".nav-bar");

const windowHeight = window.innerHeight;
window.addEventListener("scroll", () => {
  let position, top;
  if (windowHeight <= window.scrollY) {
    position = "fixed";
    top = 0;
  } else {
    position = "absolute";
    top = "100vh";
  }

  navBar.style.position = position;
  navBar.style.top = top;
  navBar.style.zIndex = 2000;
});

// CONCEPTION DU SWIPPER
const swipperBtns = document.querySelectorAll(".slider-btn");
const cards = document.querySelectorAll(".member-box");
let index = 0;

swipperBtns.forEach((s) => {
  s.addEventListener("click", (e) => {
    const parent = e.target.parentNode;
    const action = parent.dataset.action;

    switch (action) {
      case "previous":
        index--;

        if (index < 0) {
          index = cards.length - 1;
        }
        break;

      case "next":
        index++;

        if (index > cards.length - 1) {
          index = 0;
        }
        break;
    }

    for (let i = 0; i < cards.length; i++) {
      const c = cards[i];

      c.classList.remove("showed");
    }

    cards[index].classList.add("showed");
  });
});
