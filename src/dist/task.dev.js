"use strict";

var _galleryItems = _interopRequireDefault(require("./gallery-items.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ulRef = document.querySelector(".gallery"); //const itemRef = document.querySelector(".gallery__item");

var lightboxRef = document.querySelector(".lightbox");
var lightboxOverlayRef = document.querySelector(".lightbox__overlay");
var lightboxImageRef = document.querySelector(".lightbox__image"); //modalContentRef = document.querySelector(".lightbox__content");

var closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');

var madeGalleryImages = _galleryItems["default"].reduce(function (collection, img, i) {
  img = "\n<li class=\"gallery__item\">\n<a class=\"gallery__link\" href=\"".concat(img.original, "\">\n  <img class=\"gallery__image\"\n    src=\"").concat(img.preview, "\" data-source=\"").concat(img.original, "\"\n    alt=\"").concat(img.description, "\"/>\n</a>\n</li>");
  return collection += img;
}, "");

ulRef.insertAdjacentHTML("afterbegin", madeGalleryImages);
ulRef.addEventListener("click", onGalleryClick);
closeModalBtn.addEventListener("click", closeGalleryOnBtn);
lightboxOverlayRef.addEventListener("click", closeGalleryOnLightbox);
document.addEventListener("keydown", closeGalleryOnEsc); //document.addEventListener("keyup", scrollImagesInModal);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) return;
  lightboxRef.classList.add("is-open");
  lightboxImageRef.src = event.target.dataset.source;
  lightboxImageRef.alt = event.target.alt;
}

function closeGalleryOnEsc(event) {
  if (lightboxRef.className.includes("is-open") && event.code === "Escape") {
    onCloseModal();
  }
}

function closeGalleryOnBtn(event) {
  if (event.target !== closeModalBtn) return;
  lightboxRef.classList.remove("is-open");
  window.removeEventListener("click", closeGalleryOnBtn);
}

function closeGalleryOnLightbox(event) {
  if (event.target !== event.currentTarget) return;
  lightboxRef.classList.remove("is-open");
  document.removeEventListener("click", closeGalleryOnLightbox);
}

function onCloseModal() {
  window.removeEventListener("keydown", closeGalleryOnEsc);
  lightboxRef.classList.remove("is-open");
} //function scrollImagesInModal(event) {
//  let index = event.target.firstElementChild.dataset.index;
//  if (lightboxRef.className.includes(!"is-open")) return;
//  if (event.keyCode === 37 && imagesCollection.length - 1) {
//    index += 1;
//  }
//  event.target.firstElementChild.dataset.index = index;
//  lightboxImageRef.setAttribute("src", imagesCollection[index].original);
//  lightboxImageRef.setAttribute("alt", imagesCollection[index].description);
//}