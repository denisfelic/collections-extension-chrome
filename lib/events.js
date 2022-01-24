import { Collections } from './Collections.js';
import { data } from './data/state.js';
import { $, hideElement, showElement } from './Helpers/CollectionHelpers.js';
import { updateDOM } from './render.js';
export const events = {
  createNewCollection: () => {
    $('[data-element-js="create-collection-btn"]').addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        let collectionName = window.prompt('Collection name');
        let col = {
          collectionName: collectionName,
          links: [],
        };
        data.push(col);
        updateDOM();
      }
    );
  },

  loadsClickableOnCollectionEvent: () => {
    const collections = document.querySelectorAll(
      '[data-collection="clickable"]'
    );
    collections.forEach((col, index) => {
      col.addEventListener('click', (event) => {
        event.stopPropagation();
        Collections.renderCollectionLinks(index);
      });
    });
  },

  modalBackButtonEvent: () => {
    $('[data-collection-modal-js="backButton"]').addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        hideElement('[data-element-js="collection-modal"]');
        showElement('[data-element-js="container-head"]');
        showElement('[data-element-js="collections"]');
      }
    );
  },

  addCurrentPageEvent: (collectionId) => {
    function addPage(e) {
      e.stopPropagation();
      let currentLink = window.location.href;
      data[collectionId].links.push({ link: currentLink });
      Collections.renderCollectionLinks(collectionId);
    }

    $('[data-element-js="add-current-page"]').addEventListener(
      'click',
      addPage
    );
    console.log(data[collectionId]);
  },
};
