# Wiki Speedrun Tracker

[!] NOTE: I vibe coded this project mostly btw.

## Overview

**Wiki Speedrun Tracker: The Ultimate Wikipedia Speedrun Companion**  
Wiki Speedrun Tracker is a sleek, minimalist Chrome extension built for Wikipedia speedrunners who live for the thrill of the chase. Designed with a pure black backdrop, off-white text, and subtle green accents, the UI screams modern simplicity—think Fira Code monospace for that clean, professional edge. Set your target article and username in a distraction-free popup, hit start, and watch the magic happen. A lightweight overlay tracks your clicks and time as you navigate Wikipedia’s maze, persisting across pages with ninja-like precision. Reach your target, and the extension fires a Discord webhook to flex your stats—perfect for bragging rights with friends like Yasharth and Mr_Future. Whether you’re a casual clicker or a speedrun pro, this extension’s got your back with a no-nonsense design and hacker-level functionality. Ready to dominate your next run? Let’s roll. 🚀

## Features

- **Minimalist UI**: Pure black background, off-white text, Fira Code font, and green accents for a clean, modern look.
- **Click Tracking**: Counts your clicks as you navigate Wikipedia links, persisting across pages.
- **Overlay Display**: Shows your target, clicks, and time in a floating overlay on Wikipedia pages.
- **Discord Webhook**: Sends a message to your Discord server when you reach your target article.
- **Cross-Browser**: Works on Brave and Firefox (Chrome-compatible).

## Installation

### Prerequisites
- Brave browser (recommended) or Firefox.
- Windows OS (tested on Windows, but should work on other OS too).
- A Discord webhook URL (optional, for sharing results).

### Steps
1. **Clone or Download the Project**:
   - Create a folder: `C:\Users\YourName\Desktop\wiki-speedrun-extension`.
   - Save all project files (listed below) into this folder.

2. **Load the Extension in Brave**:
   - Open Brave, go to `brave://extensions/`.
   - Enable "Developer mode" (top-right toggle).
   - Click "Load unpacked".
   - Navigate to `C:\Users\YourName\Desktop\wiki-speedrun-extension`, select the folder, and click "Select Folder".

3. **Optional: Configure Brave Shields**:
   - Go to `https://en.wikipedia.org`, click the lion icon (top-right).
   - Set Shields to "Disabled" for Wikipedia (just in case, though no external assets are used).
   - Or: `brave://settings/shields`, set "Shields" to "Simple".

4. **For Firefox**:
   - Open Firefox, go to `about:debugging#/runtime/this-firefox`.
   - Click "Load Temporary Add-on", select `manifest.json` from the project folder.
   - Note: Temporary add-ons disappear on browser restart.

## Usage

1. **Pin the Extension**:
   - In Brave, click the puzzle piece (top-right) > Manage Extensions > Pin "Wiki Speedrun Tracker".

2. **Start a Speedrun**:
   - Click the extension icon to open the popup.
   - Enter your target article (e.g., "Elon Musk") and username (e.g., "Yasharth").
   - Click "Start Speedrun".

3. **Track Your Progress**:
   - Navigate Wikipedia by clicking links.
   - An overlay (top-right) shows your target, clicks, and time.

4. **Finish and Share**:
   - Reach your target article, and the extension sends a Discord webhook with your stats (e.g., "Yasharth reached Elon Musk in 5 clicks! 🏆").
   - Click "Stop Speedrun" to reset and start a new run.

## Project Files

- `manifest.json`: Extension configuration.
- `popup.html`: The minimalist UI for setting up your speedrun.
- `popup.js`: Handles popup interactions and starts/stops the speedrun.
- `content.js`: Tracks clicks and displays the overlay on Wikipedia pages.
- `background.js`: Sends the Discord webhook when you reach your target.

## Troubleshooting

- **Overlay Not Showing**:
  - Ensure you’re on a Wikipedia page (`https://*.wikipedia.org/wiki/*`).
  - Check DevTools Console (right-click page > Inspect > Console) for errors.
- **Webhook Not Firing**:
  - Verify your Discord webhook URL in `background.js`.
  - Check network requests in DevTools (Network tab).
- **UI Issues**:
  - If the font (Fira Code) isn’t available, it falls back to Consolas.
  - Confirm `popup.html` and `popup.js` are in the project folder.

## Future Ideas

- Add a live click counter in the popup.
- Style the overlay to match the popup’s minimalist design.
- Support leaderboards to compete with friends.

## Privacy

- No external assets (fonts are system-based).
- Only external call is the Discord webhook (optional).
- All data is stored locally via `chrome.storage.local`.

## Authors

- Yasharth & Mr_Future—speedrun enthusiasts and tech wizards.

Built with 💻 and a love for Wikipedia rabbit holes. Let’s speedrun smarter, fam!
