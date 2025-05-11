// Initialize popup controls
const targetInput = document.getElementById('target');
const usernameInput = document.getElementById('username');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const statusDiv = document.getElementById('status');

// Load saved username (Yasharth or Mr_Future)
chrome.storage.local.get(['username'], (result) => {
  if (result.username) usernameInput.value = result.username;
});

// Start speedrun
startButton.addEventListener('click', () => {
  const target = targetInput.value.trim();
  const username = usernameInput.value.trim() || 'Anonymous';
  if (!target) {
    statusDiv.textContent = 'Please enter a target article!';
    return;
  }
  // Save username and start speedrun
  chrome.storage.local.set({ target, username, clicks: 0, running: true }, () => {
    statusDiv.textContent = `Running to ${target} as ${username}...`;
    startButton.disabled = true;
    stopButton.disabled = false;
    // Notify content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'start', target, username });
    });
  });
});

// Stop speedrun
stopButton.addEventListener('click', () => {
  chrome.storage.local.set({ running: false, clicks: 0 }, () => {
    statusDiv.textContent = 'Speedrun stopped. Enter new target to restart.';
    startButton.disabled = false;
    stopButton.disabled = true;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'stop' });
    });
  });
});

// Update status if already running
chrome.storage.local.get(['running', 'target', 'username', 'clicks'], (result) => {
  if (result.running) {
    statusDiv.textContent = `Running to ${result.target} as ${result.username} (${result.clicks} clicks)`;
    startButton.disabled = true;
    stopButton.disabled = false;
  }
});