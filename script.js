// 'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (ele) {
  ele.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  if (e.target.classList.contains('nav__link')) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tabbed component
let tabs = document.querySelectorAll('.operations__tab');
let tabsContainer = document.querySelector('.operations__tab-container');
let tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  let clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
/// menu fade
let handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    let link = e.target;
    let siblings = link.closest('.nav').querySelectorAll('.nav__link');
    let logo = link.closest('.nav').querySelector('img');
    siblings.forEach(ele => {
      if (ele != link) {
        ele.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};
let navBtn = document.querySelector('.nav');
navBtn.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
navBtn.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

let header = document.querySelector('.header');
let callBack = function (entries) {
  let entry = entries[0];
  if (!entry.isIntersecting) {
    navBtn.classList.add('sticky');
  } else navBtn.classList.remove('sticky');
};
let callOps = {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
};
let observer = new IntersectionObserver(callBack, callOps);
observer.observe(header);

// scroll - to - view
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
let allSections = document.querySelectorAll('.section');
let sectionScroll = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
//sectionScroll.observe()
allSections.forEach(section => {
  sectionScroll.observe(section);
});

///lazy-loading images

let lazyLoading = function (entries, obeserver) {
  let [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

let images = document.querySelectorAll('img[data-src]');
let lazyObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
images.forEach(image => {
  lazyObserver.observe(image);
});

///slider
let slides = document.querySelectorAll('.slide');
let btnLeft = document.querySelector('.slider__btn--left');
let btnRight = document.querySelector('.slider__btn--right');

let currIndex = 0;
let maxLength = slides.length - 1;

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

let slidetoRight = function () {
  if (currIndex == maxLength) {
    currIndex = 0;
  } else {
    currIndex++;
  }
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - currIndex)}%)`)
  );
};
let slidetoLeft = function () {
  if (currIndex == 0) {
    currIndex = maxLength;
  } else currIndex--;
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - currIndex)}%)`)
  );
};

btnRight.addEventListener('click', slidetoRight);
btnLeft.addEventListener('click', slidetoLeft);
