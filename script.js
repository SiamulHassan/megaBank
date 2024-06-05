'use strict';
/// old way of scroll behavior
const sectionOne = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('.nav');
const tabBtnContainer = document.querySelector('.operations__tab-container');
const operationTabs = document.querySelectorAll('.operations__tab');
const operationContent = document.querySelectorAll('.operations__content');
const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector('.header');
const dotContainer = document.querySelector('.dots');
const mobileHambargur = document.querySelector('.mobile__hambargur');
const mobileMenu = document.querySelector('.mobile_menu');
const mobileTimes = document.querySelector('.mobile_times');

mobileHambargur.addEventListener('click', function () {
  mobileMenu.style.right = '0';
});

mobileTimes.addEventListener('click', function () {
  mobileMenu.style.right = '-700px';
});
//////////////////////// sticky nav
// const headerTitle = document.querySelector('.header__title');
// headerTitle.innerHTML = `
// <div class="innerHtml">
// We use cookie for better user experice
// <button>Got It<button>
// </div>
// `;
// headerTitle.prepend(headerTitle);
const stickyNav = function (entries) {
  // entries holo threshold er collection array, ar viewport er koto tuku ched korle stickyNav call hobe ta threshold controle kore, so entries e muloto array r moddhe threshold object thakbe.....so entries theke amra object pabo
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else {
    nav.classList.remove('sticky');
  }
};
const scrollObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
scrollObserver.observe(header);

// //////////////////////// reveal sections
// // css e section.hide class ache
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const observerObject = {
  root: null,
  threshold: 0.2,
};
const sectionObserver = new IntersectionObserver(revealSection, observerObject);
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//////////////////////// smooth scroll
btnScrollTo.addEventListener('click', function (e) {
  // viewport to the section
  // console.log('se1', sectionOne.getBoundingClientRect());
  // const secOneCord = sectionOne.getBoundingClientRect();
  // console.log('sec', secOneCord);
  // // pageOffser is older and deprecated but it is more botter than scrollY/X in case of cross browse compatibiity. so it is also safe to use window.pageYOffset...they are same
  // window.scrollTo(
  //   secOneCord.left + window.scrollX,
  //   secOneCord.top + window.scrollY
  // );
  // console.log('sectionOne', sectionOne);
  // window.scrollTo({
  //   left: secOneCord.left + window.scrollX,
  //   top: secOneCord.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  ///////// modern way
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////// navigation effect
//mouseenter does not get bubble effect
function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/////////////// scroll to desired section
const navLinks = document.querySelector('.nav__links');

navLinks.addEventListener('click', function (e) {
  e.preventDefault(); // smoothscroll wont work unless you do preventDefault
  const targetEleClick = e.target.closest('.nav__item');
  // ami jodi 'nav-link' te click kori then e.target hobe 'nav-link', tahole 'nav-link' er closest parent ke dhorbe which is 'nav-item'----jake click korchi tar closest parent ke dhoro orthat click ta parent e i hocche
  if (targetEleClick) {
    // targetEleClick holo 'nav__item' . er moddhe ache 'nav__link'--> targetEleClick er moddhe je 'nav__link' ache (going downwards) take dhoro.
    const secAttribute = targetEleClick
      .querySelector('.nav__link')
      .getAttribute('href');
    // selec that section you are going with this --> secAttribute
    document.querySelector(secAttribute).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////// TAB COMPONENT\
// operations__tab-container
tabBtnContainer.addEventListener('click', function (e) {
  const targetEl = e.target.closest('.operations__tab');
  if (targetEl) {
    // remove all active classes
    // operations__tab
    operationTabs.forEach(tabsBtn =>
      tabsBtn.classList.remove('operations__tab--active')
    );
    operationContent.forEach(content =>
      content.classList.remove('operations__content--active')
    );
    // adding active class
    targetEl.classList.add('operations__tab--active');
    const contentActive = targetEl.dataset.tab;
    document
      .querySelector(`.operations__content--${contentActive}`)
      .classList.add('operations__content--active');
  }
});
///////////////////////// lazy loadin images
const lazyImages = document.querySelectorAll('img[data-src]');
const observeImg = function (entries, imgObserver) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  imgObserver.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(observeImg, {
  root: null,
  threshold: 0,
  // rootMargin: '-400px',
});
lazyImages.forEach(img => {
  imgObserver.observe(img);
});
///////////////////////// slider
const slider = function () {
  const sliderLeftBtn = document.querySelector('.slider__btn--left');
  const sliderRightBtn = document.querySelector('.slider__btn--right');
  let currentSlide = 0;
  ////// keeping the slide side by side
  const slides = document.querySelectorAll('.slide');
  const maxSlide = slides.length - 1;
  const activeDot = function (slide) {
    // removing active class from all the dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    // adding active class which is active dot (slide)
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };
  const gotoSlide = function (slide) {
    slides.forEach(
      (sl, i) => (sl.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    gotoSlide(currentSlide);
    activeDot(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    gotoSlide(currentSlide);
    activeDot(currentSlide);
  };
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };
  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activeDot(slide);
    }
  });
  // this function tells about the initial state of our slider
  const initSlide = function () {
    // serially call matters
    gotoSlide(0);
    createDots();
    activeDot(0);
  };
  initSlide();
  //////// slider event handlers
  sliderRightBtn.addEventListener('click', nextSlide);
  sliderLeftBtn.addEventListener('click', prevSlide);
  // keydown is fired as soon as the key is pressed down
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });
};
slider();
///////////////////////////// Modal window
// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnCloseModal = document.querySelector('.btn--close-modal');
// // this btn opens modal
// // const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// const openModal = function () {
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// const closeModal = function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });

///////////////////////////// BANKIST HERE
