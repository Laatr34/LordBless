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
