import {default as imagesCollection} from "./gallery-items.js";

const ulRef = document.querySelector(".gallery");


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