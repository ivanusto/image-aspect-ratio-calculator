# Aspect Ratio & Crop Pro (Image & Video Ratio Calculator & Cropper)

[繁體中文說明](README.zh-TW.md)

> A modern, privacy-first, 100% client-side web application for image and video aspect ratio calculation, real-time center-cropping, and high-quality export.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-emerald.svg)](https://ivanusto.github.io/image-aspect-ratio-calculator/)
[![Author](https://img.shields.io/badge/Author-ivanusto-indigo.svg)](https://github.com/ivanusto)
[![Blog](https://img.shields.io/badge/Blog-yblog.org-cyan.svg)](https://yblog.org)

## ✨ Key Features

- ⚡ **Smart Text Parsing**: Instant ratio calculation from pasted expressions like `1024 x 1280`, `1024*1280`, or `1024, 1280` into simplified ratios (`4 : 5`).
- 🖼️ **Native Image & Video File Inspection**: Drag-and-drop or press `Ctrl + V` to paste image (JPG, PNG, WEBP) or video files (MP4, WEBM) to detect real native resolutions.
- ✂️ **HTML5 Canvas Local Cropping & Export**: Auto center-crop to target ratios with customizable **WEBP / PNG / JPG** formats and quality control slider.
- 📐 **Proportional Resizer Calculator**: Lock aspect ratios and calculate width/height with 50%, 75%, 150%, 200% quick scale presets.
- 🎯 **Standard Ratio & Platform Recommendations**: Intelligent matching against Instagram (4:5 / 1:1), TikTok/Reels (9:16), YouTube (16:9), and cinema standards.
- 📲 **Save to Photos via Web Share API**: Direct iOS / Android system photo library save menu support.
- 📴 **PWA & Offline Ready**: Service Worker cached App Shell for full offline capabilities and standalone installation.
- 🔒 **100% Privacy-First**: All image and video computations remain 100% local in browser memory. No server uploads or tracking.
- 🎨 **Modern Dark Glassmorphism Design**: Dynamic ambient lighting, rule-of-thirds composition grid overlay, and responsive mobile-first UI.

## 🌐 Live Demo

- **GitHub Pages**: [https://ivanusto.github.io/image-aspect-ratio-calculator/](https://ivanusto.github.io/image-aspect-ratio-calculator/)
- **Author's Website**: [https://yblog.org](https://yblog.org)
- **Author's GitHub**: [@ivanusto](https://github.com/ivanusto)

## 🚀 Local Development & Usage

Built with zero dependencies using vanilla HTML5, CSS3, and modern JavaScript (ES6). No Node.js or build tools required.

### Quick Start:
Clone the repository and open `index.html` directly in your browser, or start a local Python server:

```bash
git clone https://github.com/ivanusto/image-aspect-ratio-calculator.git
cd image-aspect-ratio-calculator
python -m http.server 8080
```

Open `http://localhost:8080` in your web browser.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
