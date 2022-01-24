
// Initialize butotn with users's prefered color
let addToPageButton = document.getElementById('changeColor');
let fakeData = ['www.g1.com'];

chrome.storage.sync.set({ customURL: fakeData });
renderUrlList();

// When the button is clicked, inject setCurrentTabURL into current page
addToPageButton.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setCurrentTabURL,
  });

  updateFakeDataFromAsyncStorage();
  renderUrlList();
});

function updateFakeDataFromAsyncStorage() {
  chrome.storage.sync.get('customURL', (data) => {
    fakeData = data.customURL;
  });
}

// The body of this function will be execuetd as a content script inside the
// current page
function setCurrentTabURL() {
  chrome.storage.sync.get('customURL', (data) => {
    let urls = data.customURL;
    let newSiteURL = window.location.href;

    if (newSiteURL == urls[urls.length - 1]) return;

    fakeData = [...urls, newSiteURL];
    console.log(fakeData);
    // update on local storage
    chrome.storage.sync.set({ customURL: fakeData });
  });
}

function renderUrlList() {
  let sitesListHtmlElement = document.querySelector('[data-sites="urls"');
  sitesListHtmlElement.innerHTML = '';
  fakeData.forEach((url) => {
    let li = document.createElement('li');
    li.classList.add('list-url');
    let link = document.createElement('a');
    link.href = url;
    link.textContent = url;
    link.target = '_blank';
    li.appendChild(link);
    sitesListHtmlElement.appendChild(li);
  });
  fetchData();
}

function checkUrlsAreEquals(url1, url2) {
  return url1 === url2;
}

function fetchData() {
  fetch('http://localhost:8080/?q=1234')
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
