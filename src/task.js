import { default as imagesCollection } from "./gallery-items.js";

const ulRef = document.querySelector(".gallery");
//const itemRef = document.querySelector(".gallery__item");
const lightboxRef = document.querySelector(".lightbox");
const lightboxOverlayRef = document.querySelector(".lightbox__overlay");
const lightboxImageRef = document.querySelector(".lightbox__image");
//modalContentRef = document.querySelector(".lightbox__content");
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);

const madeGalleryImages = imagesCollection.reduce((collection, img, i) => {
  img = `
<li class="gallery__item">
<a class="gallery__link" href="${img.original}">
  <img class="gallery__image"
    src="${img.preview}" data-source="${img.original}"
    alt="${img.description}"/>
</a>
</li>`;
  return (collection += img);
}, "");

ulRef.insertAdjacentHTML("afterbegin", madeGalleryImages);

ulRef.addEventListener("click", onGalleryClick);
closeModalBtn.addEventListener("click", closeGalleryOnBtn);
lightboxOverlayRef.addEventListener("click", closeGalleryOnLightbox);
//document.addEventListener("keydown", closeGalleryOnEsc);
//document.addEventListener("keyup", scrollImagesInModal);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) return;
  lightboxRef.classList.add("is-open");

  lightboxImageRef.src = event.target.dataset.source;
  lightboxImageRef.alt = event.target.alt;
  document.addEventListener("keydown", closeGalleryOnEsc);
}
function closeGalleryOnEsc(event) {
  if (lightboxRef.className.includes("is-open") && event.code === "Escape") {
    onCloseModal();
  }
}

function closeGalleryOnBtn(event) {
  if (event.target !== closeModalBtn) return;
  onCloseModal()
  //lightboxRef.classList.remove("is-open");
  //window.removeEventListener("click", closeGalleryOnBtn);
}

function closeGalleryOnLightbox(event) {
  if (event.target !== event.currentTarget) return;
  onCloseModal()
  //lightboxRef.classList.remove("is-open");
  //document.removeEventListener("click", closeGalleryOnLightbox);
}

function onCloseModal() {
  window.removeEventListener("keydown", closeGalleryOnEsc);
  document.removeEventListener("click", closeGalleryOnLightbox);
  lightboxRef.classList.remove("is-open");
  window.removeEventListener("click", closeGalleryOnBtn);
}

//function scrollImagesInModal(event) {
//  let index = event.target.firstElementChild.dataset.index;
//  if (lightboxRef.className.includes(!"is-open")) return;
//  if (event.keyCode === 37 && imagesCollection.length - 1) {
//    index += 1;
//  }
//  event.target.firstElementChild.dataset.index = index;
//  lightboxImageRef.setAttribute("src", imagesCollection[index].original);
//  lightboxImageRef.setAttribute("alt", imagesCollection[index].description);
//}
