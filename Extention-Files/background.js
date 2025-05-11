// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'targetReached') {
    sendDiscordWebhook(message.username, message.clicks, message.article);
  } else if (message.action === 'updateClicks') {
    // Update popup with click count if open
    chrome.runtime.sendMessage({ action: 'updateClicks', clicks: message.clicks });
  }
});

// Send Discord webhook
function sendDiscordWebhook(username, clicks, article) {
  const webhookUrl = '<your-discord-webhook-api>';
  const payload = {
    content: `${username} reached ${article} in ${clicks} clicks! 🏆`
  };
  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(response => {
    if (!response.ok) console.error('Webhook failed:', response.status);
  }).catch(error => console.error('Webhook error:', error));
}