document.addEventListener("DOMContentLoaded", () => {
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

  const memberImg = $(".grp-photo-box img");

  $.each(memberImg, function (i, img) {
    let yRem;
    if (i % 2 == 0) {
      yRem = "-1.25rem";
    } else {
      yRem = "1.25rem";
    }
    gsap.to(img, {
      y: yRem,
      opacity: 1,

      scrollTrigger: {
        trigger: ".nav-bar",
        start: "top 40%",
      },
    });
  });

  const gTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".member-section",
      start: "top 60%",
    },
  });

  gTimeline
    .to(".member-section .card-wrapper", {
      y: 0,
      opacity: 1,
      duration: 0.3,
    })
    .to(".card-wrapp", {
      duration: 0.3,
      stagger: 0.1,
    });

  const cards = $(".card-wrapp");

  blobsColors($(cards[0]).css("background-color"));

  const controlBtn = $(".btn-control");

  cards.each(function (i, c) {
    $(c).css({ zIndex: cards.length - i });
  });

  let zIndexPrev = 10,
    cardBg;

  $.each(controlBtn, (_, btn) => {
    $(btn).on("click", function (e) {
      const action = e.currentTarget.dataset.action;

      let index = $.map(cards, function (c, j) {
        if ($(c).hasClass("active")) {
          return j;
        }
      })[0];

      if (
        (action === "next" && index >= cards.length - 1) ||
        (action === "previous" && index <= 0)
      ) {
        return;
      }

      if (action === "previous") {
        zIndexPrev++;
      }

      const slider = {
        zIndex: action === "next" ? 10 : zIndexPrev,
        transform: `translateX(${action === "next" ? -210 : 210}px) scale(0.9)`,
      };

      const activeCard = cards[index];

      $(activeCard).css(slider).removeClass("active");

      const newIndex = action === "next" ? index + 1 : index - 1;
      const newCard = cards[newIndex];
      cardBg = $(newCard).css("background-color");
      blobsColors(cardBg);

      $(newCard)
        .css({
          transform: `translateX(0) scale(1)`,
        })
        .addClass("active");
    });
  });

  function getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  const objs = $(".hero .bcg-img img");

  $.each(objs, function (_, o) {
    let yRandom = getRandom(100);

    gsap.to(o, {
      y: yRandom,
      duration: 0.8,
      rotate: getRandom(180),
    });

    gsap.to(o, {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: 3,
      },

      y: yRandom - 200,
    });
  });

  const workingCards = document.querySelectorAll(".language");
  const toggleBtn = document.querySelectorAll(".control-btn span");

  toggleBtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      toggleBtn.forEach((b) => b.classList.remove("active"));
      workingCards.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");

      const activeCard = workingCards[i];

      workingCards.forEach((card, j) => {
        if (card !== activeCard) {
          gsap.to(card, {
            x: j < i ? -50 : 50,
            scale: 0.7,
            opacity: 0.4,
            duration: 0.5,
            zIndex: 0,
          });
        }
      });

      gsap.to(activeCard, {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        zIndex: 1,
        ease: "power2.out",
      });

      activeCard.classList.add("active");
    });
  });
});

const blobs = document.querySelectorAll(".blob-unit");

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

// COULEURS DES BLOBS

function blobsColors(cardBg) {
  blobs.forEach((b) => {
    b.style.backgroundColor = cardBg;
  });
}
