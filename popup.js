// Initialize butotn with users's prefered color
let changeColor = document.getElementById('changeColor');
chrome.storage.sync.set({ customURL: [] });

chrome.storage.sync.get('color', ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });

  chrome.storage.sync.get('customURL', (data) => {
    let urls = data.customURL;
     addWebSites(urls[urls.length - 1]);
  });
  // changeColor.style.backgroundColor = 'orange';
  // changeColor.innerText = 'Olá Mundo';
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get('customURL', (data) => {
    let urls = data.customURL;
    let newSiteURL = window.location.href;

    if (newSiteURL == urls[urls.length - 1]) return;

    urls = [...urls, newSiteURL];
    // update on local storage
    chrome.storage.sync.set({ customURL: urls });
  });
}

function addWebSites(siteName) {
  let sitesListHtmlElement = document.querySelector('[data-sites="urls"');
  let li = document.createElement('li');
  li.textContent = siteName;
  sitesListHtmlElement.appendChild(li);
}

function checkUrlsAreEquals(url1, url2) {
  return url1 === url2;
}
