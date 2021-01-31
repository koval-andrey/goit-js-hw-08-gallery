import {default as imagesCollection} from "./gallery-items.js";

const ulRef = document.querySelector(".gallery");
const itemRef = document.querySelector(".gallery__item");
const lightboxRef = document.querySelector('.lightbox');
const lightboxImegeRef = document.querySelector('.lightbox__image')
const modalContentRef = document.querySelector('.lightbox__content');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');



const madeGalleryImages = imagesCollection.reduce((collection, img) => {img =`
<li class="gallery__item">
<a class="gallery__link" href="${img.original}">
  <img class="gallery__image"
    src="${img.preview}" data-source="${img.original}"
    alt="${img.description}"/>
</a>
</li>`; 
return collection += img;
}, '');

ulRef.insertAdjacentHTML('afterbegin', madeGalleryImages);

itemRef.addEventListener('click', onGalleryClick);
closeModalBtn.addEventListener('click', closeGalleryOnBtn)
document.addEventListener('keydown', closeGalleryOnEsc);
lightboxRef.addEventListener('click', closeGalleryOnlightbox);


function onGalleryClick(event){
  event.preventDefault();
  lightboxRef.classList.add('is-open');
  lightboxImegeRef.setAttribute('src', `${event.target.getAttribute('src')}`);
};
function closeGalleryOnEsc(event){
  if(event.code === 'Escape') {
    lightboxRef.classList.remove('is-open');
   document.removeEventListener('click', closeGalleryOnEsc)
  }
};

function closeGalleryOnBtn(event){
  if(event.target === closeModalBtn) {
    lightboxRef.classList.remove('is-open');
    document.removeEventListener('click', closeGalleryOnBtn); 
  }
}

function closeGalleryOnlightbox(event){
  if(event.target === event.currentTarget){
    lightboxRef.classList.remove('is-open');
    document.removeEventListener('click', closeGalleryOnlightbox);
  }
}