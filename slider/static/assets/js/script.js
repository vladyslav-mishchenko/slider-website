var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
const form = document.querySelector(".footer-subscribe-form");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(form["name"].value);
  console.log(form["email"].value);
});
const body = document.querySelector(".body");
const mobileBtn = document.querySelector(".mobile-btn");
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
const mobileMenuPanel = document.querySelector(".mobile-menu-panel");
const mobileMenuPanelClose = document.querySelector(".mobile-manu-panel-close");
mobileBtn.addEventListener("click", mobileMenuOpen);
mobileMenuPanelClose.addEventListener("click", mobileMunuClose);
function mobileMenuOpen() {
  mobileMenuOverlay.classList.add("d");
  setTimeout(() => {
    mobileMenuOverlay.classList.add("a");
    body.classList.add("scroll-off");
    setTimeout(() => {
      mobileMenuPanel.classList.add("open");
    }, 200);
  }, 10);
}
function mobileMunuClose() {
  mobileMenuPanel.classList.remove("open");
  setTimeout(() => {
    mobileMenuOverlay.classList.remove("a");
    setTimeout(() => {
      mobileMenuOverlay.classList.remove("d");
      body.classList.remove("scroll-off");
    }, 200);
  }, 100);
}
class Elements {
  constructor(slider) {
    this.slides = this.els(slider + " .img-slider--slides > .slide");
    this.miniatures = this.els(slider + " .img-slider--miniatures > .miniature");
    this.leftBtn = this.el(slider + " .left-btn");
    this.rightBtn = this.el(slider + " .right-btn");
    this.center = this.el(slider + " .center");
    console.log(slider);
  }
  el(element) {
    return document.querySelector(element);
  }
  els(elements) {
    return document.querySelectorAll(elements);
  }
}
class Slider extends Elements {
  constructor(parameters) {
    super(parameters.slider);
    __publicField(this, "firstStartTimeout", 7e3);
    __publicField(this, "changeSlideTimeout", 5e3);
    __publicField(this, "slide", this.startFromSlide());
    __publicField(this, "setTimeoutId", null);
    __publicField(this, "touchStartX", null);
    this.events();
  }
  start() {
    this.setTimeoutId = setTimeout(() => this.run(), this.firstStartTimeout);
  }
  stop() {
    clearTimeout(this.setTimeoutId);
  }
  run() {
    this.slider();
    this.setTimeoutId = setTimeout(() => this.run(), this.changeSlideTimeout);
  }
  slider() {
    this.animationOn();
    this.increment();
    this.changeSlide();
  }
  prev() {
    this.stop();
    this.animationOff();
    this.decrement();
    this.changeSlide();
    this.start();
  }
  next() {
    this.stop();
    this.animationOff();
    this.increment();
    this.changeSlide();
    this.start();
  }
  increment() {
    this.slide++;
    if (this.slide > this.slides.length - 1) {
      this.slide = 0;
    }
  }
  decrement() {
    this.slide--;
    if (this.slide < 0) {
      this.slide = this.slides.length - 1;
    }
  }
  animationOn() {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.remove("na");
    }
  }
  animationOff() {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.add("na");
    }
  }
  changeSlide() {
    this.slides[this.slide].classList.add("active");
    this.miniatures[this.slide].classList.add("active");
    for (let i = 0; i < this.slides.length; i++) {
      if (i != this.slide) {
        this.slides[i].classList.remove("active");
        this.miniatures[i].classList.remove("active");
      }
    }
  }
  changeSlideById(e) {
    this.stop();
    this.animationOff();
    this.slide = Number(e.srcElement.getAttribute("data-slide"));
    this.changeSlide();
    this.start();
  }
  swipeStart(e) {
    this.touchStartX = e.touches[0].clientX;
  }
  swipeEnd(e) {
    if (this.touchStartX > e.changedTouches[0].clientX) {
      this.prev();
    } else {
      this.next();
    }
  }
  startFromSlide() {
    for (let i = 0; i < this.slides.length; i++) {
      if (this.slides[i].classList.contains("active")) {
        return i;
      }
    }
  }
  events() {
    if (this.leftBtn != null) {
      this.leftBtn.addEventListener("click", () => this.prev());
    }
    if (this.rightBtn != null) {
      this.rightBtn.addEventListener("click", () => this.next());
    }
    if (this.center != null) {
      this.center.addEventListener("touchstart", (e) => this.swipeStart(e));
      this.center.addEventListener("touchend", (e) => this.swipeEnd(e));
    }
    for (let i = 0; i < this.miniatures.length; i++) {
      this.miniatures[i].addEventListener("click", (e) => this.changeSlideById(e));
    }
  }
}
document.addEventListener("DOMContentLoaded", function() {
  new Slider({ slider: "#mainslider" }).start();
});