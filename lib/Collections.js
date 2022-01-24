import { $, hideElement } from './Helpers/CollectionHelpers.js';
import { data } from './data/state.js';
import { events } from './events.js';

export const Collections = {
  renderCollectionList() {
    let collectionsHTML = $(
      '[data-element-js="container"] [data-element-js="collections"]'
    );
    collectionsHTML.innerHTML = '';
    data.forEach((dt, index) => {
      let li = document.createElement('li');
      li.dataset.collectionId = index;
      li.dataset.collection = 'clickable';
      li.innerText = dt.collectionName;
      collectionsHTML.appendChild(li);
    });
  },

  renderCollectionLinks(collectionId) {
    hideElement('[data-element-js="container-head"]');
    hideElement('[data-element-js="collections"]');

    let collectionData = data[collectionId];

    let modal = $('[data-element-js="collection-modal"]');
    modal.innerHTML = `
     <div class="collection-modal" data-element-js="collection-modal" style="display: block">
     <button data-collection-modal-js="backButton"><</button>
     <div class="collection-body">
       <span class="collection-title" data-element-js="collection-title"
         >Collection Name Inside</span
       >
       <button data-element-js="add-current-page">Add current page</button>
       <hr />
       <ul class="links" data-element-js="collection-links">
         <!-- Here where the links is rendered -->
       </ul>
     </div>
   </div>
     `;

    modal = $('[data-element-js="collection-modal"]');
    modal.style.display = 'block';
    let collectionTitle = modal.querySelector(
      '[data-element-js="collection-title"]'
    );
    let modalLinks = modal.querySelector(
      '[data-element-js="collection-links"]'
    );

    modal.style.display = 'block';
    collectionTitle.innerText = collectionData.collectionName;
    modalLinks.innerHTML = '';

    // render links from data
    let linkData = collectionData.links;
    linkData.forEach((link, index) => {
      let li = document.createElement('li');
      li.dataset.dataCollectionLinkId = index;
      li.textContent = link.link;
      modalLinks.appendChild(li);
    });

    events.addCurrentPageEvent(collectionId);
    events.modalBackButtonEvent();
  },
};
