'use strict';

const navigation = document.querySelector('.navigation');
const navigationBackground = document.querySelector('.navigation__background');
const btnNavi = document.querySelector('.navigation__button');
const navigationNav = document.querySelector('.navigation__nav');
const navigationList = document.querySelector('.navigation__list');

const header = document.querySelector('.header');
const allSections = Array.from(document.querySelectorAll('.section'));

const menuBox = document.querySelector('.menu-box');
const tabContainer = document.querySelector('.menu-box__tab-container');
const tabs = Array.from(document.querySelectorAll('.menu-box__tab'));
const tabsContent = Array.from(document.querySelectorAll('.menu-box__content'));

const labels = Array.from(document.querySelectorAll('.form__label'));

//* Navigation ----------------------------------------------------------

// H o v e r  L i n k s

const handleHover = function (e) {
  if (e.target.classList.contains('navigation__link')) {
    const link = e.target;

    const siblings = link
      .closest('.navigation__nav')
      .querySelectorAll('.navigation__link');

    const logo = link
      .closest('.navigation__nav')
      .querySelector('.navigation__logo');

    siblings.forEach(e => {
      if (e !== link) e.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

navigationNav.addEventListener('mouseover', handleHover.bind(0.5));
navigationNav.addEventListener('mouseout', handleHover.bind(1));

//  L i n k s    S e c t i o n

navigationNav.addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target;
  const link = clicked.classList.contains('navigation__link');
  const logo = clicked.classList.contains('navigation__logo');

  if (link || logo) {
    const sectionID = clicked.getAttribute('href');
    document.querySelector(sectionID).scrollIntoView({ behavior: 'smooth' });

    if (sectionID) navigationBackground.classList.remove('activeNavi');
  }
});

//  S t y c k y   N a v i g a t i o n

const navHeight = navigationNav.getBoundingClientRect().height;

const stickyNavi = function (entries) {
  const [entry] = entries;

  // !true a false == remove, !false a true == add
  if (!entry.isIntersecting && window.innerWidth >= 1015)
    navigationNav.classList.add('activeNav');
  else navigationNav.classList.remove('activeNav');
};

const headerObserver = new IntersectionObserver(stickyNavi, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

// Search Item
const isVisible = function (e, width) {
  const distancia = e.getBoundingClientRect();
  const isInViewport =
    distancia.top <
      (window.innerHeight || document.documentElement.clientHeight) &&
    distancia.bottom > 0;

  if (isInViewport || window.innerWidth <= width) headerObserver.disconnect();
  else headerObserver.observe(header);
};

isVisible(btnNavi, 1015);

// R e v e a l    S e c t i o n s

const revealSections = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('moveup--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('moveup--hidden');
});

// C l i c k   N a v i g a t i o n   B u t t o n

btnNavi.addEventListener('click', function (e) {
  const clicked = e.target.closest('.navigation__button');

  if (!clicked) return;

  if (clicked) navigationBackground.classList.toggle('activeNavi');
});

//* Section Menu ----------------------------------------------------------

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.menu-box__tab');

  if (!clicked) return;

  // Remove active classes
  tabs.forEach(btn => btn.classList.remove('menu-box__tab-active'));
  tabsContent.forEach(c => c.classList.remove('menu-box__content-active'));

  // Activate tabs
  clicked.classList.add('menu-box__tab-active');

  // Activate content area
  document
    .querySelector(`.menu-box__content--${clicked.dataset.tab}`)
    .classList.add('menu-box__content-active');
});

//* F O R M  ----------------------------------------------------------

// WAVE ANIMATION
labels.forEach(e => {
  e.innerHTML = e.innerText
    .split('')
    .map(
      (letter, i) =>
        `<span class="form__span" style="transition-delay:${i * 50}ms">
          ${letter}
        </span>`
    )
    .join('');
});

//* S L I D E R   ----------------------------------------------------------

const sliderContainer = document.querySelector('.slider');
const slide = Array.from(document.querySelectorAll('.slider__slide'));
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slide.length;

const slider = function () {
  const goToSlide = function (go) {
    slide.forEach(
      (e, i) => (e.style.transform = `translateX(${100 * (i - go)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };

  init();

  // Botones
  // <-
  btnLeft.addEventListener('click', prevSlide);
  // ->
  btnRight.addEventListener('click', nextSlide);

  // KeyDown
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
};

slider();

//* Lazy Img --------------------------------------------------------------------

let imgs;

(function () {
  imgs = document.querySelectorAll('img');
  imgs.forEach(img => img.classList.add('lazy-img--hidden'));
})();

const ShowImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // entry.target.classList.remove('lazy-img--hidden');

  imgs.forEach(img => img.classList.remove('lazy-img--hidden'));

  observer.unobserve(entry.target);
};

const observeLazyImg = new IntersectionObserver(ShowImg, {
  root: null,
});

imgs.forEach(img => observeLazyImg.observe(img));

//////////////////////////////////////////////////////////////////////

const animationScroll = Array.from(
  document.querySelectorAll('.animation-scroll')
);

const opciones = {
  root: null,
  threshold: 0.5,
};

const observador = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('show');

    observer.unobserve(entry.target);
  });
}, opciones);

animationScroll.forEach(e => observador.observe(e));
