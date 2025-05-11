let targetArticle = '';
let username = '';
let clickCount = 0;
let isRunning = false;
let startTime = null;
let overlay = null;

// Create overlay
function createOverlay() {
  overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '10px';
  overlay.style.right = '10px';
  overlay.style.background = 'rgba(0, 0, 0, 0.8)';
  overlay.style.color = 'white';
  overlay.style.padding = '10px';
  overlay.style.borderRadius = '5px';
  overlay.style.zIndex = '9999';
  overlay.style.fontFamily = 'Arial, sans-serif';
  overlay.style.fontSize = '14px';
  document.body.appendChild(overlay);
  updateOverlay();
}

// Update overlay content
function updateOverlay() {
  if (!overlay || !isRunning) return;
  const timeElapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  overlay.innerHTML = `
    <strong>Speedrun</strong><br>
    Target: ${targetArticle}<br>
    Clicks: ${clickCount}<br>
    Time: ${timeElapsed}s
  `;
}

// Remove overlay
function removeOverlay() {
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start') {
    targetArticle = message.target;
    username = message.username;
    clickCount = 0; // Reset clicks on new speedrun
    isRunning = true;
    startTime = Date.now();
    chrome.storage.local.set({ clicks: 0, running: true, target: targetArticle, username }, () => {
      createOverlay();
      checkPage();
      addClickListener();
    });
  } else if (message.action === 'stop') {
    isRunning = false;
    clickCount = 0; // Reset clicks on stop
    chrome.storage.local.set({ clicks: 0, running: false });
    removeOverlay();
    removeClickListener();
  } else if (message.action === 'updateClicks') {
    clickCount = message.clicks;
    updateOverlay();
  }
});

// Add click listener to Wikipedia links
function addClickListener() {
  document.querySelectorAll('#content a').forEach(link => {
    link.addEventListener('click', handleClick);
  });
}

// Remove click listener
function removeClickListener() {
  document.querySelectorAll('#content a').forEach(link => {
    link.removeEventListener('click', handleClick);
  });
}

// Handle link clicks
function handleClick(event) {
  if (!isRunning) return;
  clickCount++;
  chrome.storage.local.set({ clicks: clickCount }, () => {
    chrome.runtime.sendMessage({ action: 'updateClicks', clicks: clickCount });
    updateOverlay();
  });
}

// Check if current page is the target
function checkPage() {
  if (!isRunning) return;
  const pageTitle = document.querySelector('#firstHeading')?.textContent || document.title.replace(' - Wikipedia', '');
  if (pageTitle.toLowerCase() === targetArticle.toLowerCase()) {
    isRunning = false;
    removeOverlay();
    chrome.storage.local.set({ running: false }, () => {
      chrome.runtime.sendMessage({
        action: 'targetReached',
        username,
        clicks: clickCount,
        article: pageTitle
      });
    });
  }
}

// Observe page changes (for single-page navigation)
const observer = new MutationObserver(() => {
  checkPage();
  updateOverlay();
});
observer.observe(document.querySelector('#content') || document.body, {
  childList: true,
  subtree: true
});

// Initial check on page load
chrome.storage.local.get(['running', 'target', 'username', 'clicks'], (result) => {
  if (result.running) {
    targetArticle = result.target || '';
    username = result.username || '';
    clickCount = result.clicks || 0; // Restore click count
    isRunning = true;
    startTime = Date.now(); // Reset timer for simplicity, adjust if needed
    createOverlay();
    checkPage();
    addClickListener();
  }
});

// Update overlay every second for timer
setInterval(updateOverlay, 1000);