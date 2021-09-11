/* Mobile Nav Menu */

var toggle_btn;
var big_wrapper;
var hamburger_menu;

function declare() {
  toggle_btn = document.querySelector('.toggle-btn');
  big_wrapper = document.querySelector('.big-wrapper');
  hamburger_menu = document.querySelector('.hamburger-menu');
}

const main = document.querySelector('main');

declare();

let dark = false;

function toggleAnimation() {
  // Clone the wrapper
  dark = !dark;
  let clone = big_wrapper.cloneNode(true);
  if (dark) {
    clone.classList.remove('light');
    clone.classList.add('dark');
  } else {
    clone.classList.remove('dark');
    clone.classList.add('light');
  }
  clone.classList.add('copy');
  main.appendChild(clone);

  document.body.classList.add('stop-scrolling');

  clone.addEventListener('animationend', () => {
    document.body.classList.remove('stop-scrolling');
    big_wrapper.remove();
    clone.classList.remove('copy');
    // Reset Variables
    declare();
    events();
  });
}

function events() {
  toggle_btn.addEventListener('click', toggleAnimation);
  hamburger_menu.addEventListener('click', () => {
    big_wrapper.classList.toggle('active');
  });
}

events();

/* PAGE TRANSITION */

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  var tl = gsap.timeline();
  tl.to('.loading-screen', {
    duration: 1.2,
    width: '100%',
    left: '0%',
    ease: 'Expo.easeInOut',
  });

  tl.to('.loading-screen', {
    duration: 1,
    width: '100%',
    left: '100%',
    ease: 'Expo.easeInOut',
    delay: 0.3,
  });
  tl.set('.loading-screen', { left: '-100%' });
}

function contentAnimation() {
  var tl = gsap.timeline();
  tl.from('.animate-this', {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.4,
    delay: 0.2,
  });
}

$(function () {
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();

          pageTransition();
          await delay(1000);
          done();
        },

        async enter(data) {
          contentAnimation();
        },

        async once(data) {
          contentAnimation();
        },
      },
    ],
  });
});

/* Smooth overlay */

let open = document.querySelector('.active');
let close = document.querySelector('.exit');
let tl = gsap.timeline();

tl.to('.overlay_1', {
  opacity: 1,
  x: 0,
  scale: 1,
  pointerEvents: 'auto',
  duration: 0.3,
});
tl.to('.stagger', { x: 0, opacity: 1, stagger: 0.3 }, '-=.6');
tl.pause();

open.addEventListener('click', () => {
  tl.play();
});

close.addEventListener('click', () => {
  tl.reverse();
});
