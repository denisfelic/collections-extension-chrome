export const $ = document.querySelector.bind(document);

export function hideElement(query) {
  $(query).style.display = 'none';
}

export function showElement(query) {
  $(query).style.display = 'block';
}


