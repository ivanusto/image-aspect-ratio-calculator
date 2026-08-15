# 圖片與影片比例智慧計算與裁切器 (Aspect Ratio & Crop Pro)

🌐 **Languages / 多語言**: [English](README.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

> 一款現代化、注重隱私、100% 瀏覽器端運算的圖片與影片比例計算及即時裁切 Web 應用程式。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-emerald.svg)](https://ivanusto.github.io/image-aspect-ratio-calculator/)
[![Author](https://img.shields.io/badge/Author-ivanusto-indigo.svg)](https://github.com/ivanusto)
[![Blog](https://img.shields.io/badge/Blog-yblog.org-cyan.svg)](https://yblog.org)

## ✨ 核心亮點

- ⚡ **智慧文字貼上與解析**：支援貼上 `1024 x 1280`、`1024*1280`、`1024, 1280` 秒速算出最簡比例 `4 : 5`。
- 🖼️ **圖片與影片原生檔案讀取**：拖曳或使用 `Ctrl + V` 貼上圖片 (JPG, PNG, WEBP) 或影片 (MP4, WEBM)，自動解析真實解析度。
- ✂️ **HTML5 Canvas 本地裁切與匯出**：依據目標比例自動滿版居中裁切，並可選 **WEBP / PNG / JPG** 格式與品質 slider 下載。
- 📐 **等比例縮放算尺寸 (Resizer Calculator)**：鎖定比例輸入寬度算高度，並提供 50%、75%、150%、200% 快捷縮放按鈕。
- 🎯 **最接近標準比例與平台建議**：自動比對 Instagram (4:5 / 1:1)、TikTok/Reels (9:16)、YouTube (16:9) 等規格。
- 📲 **手機可直接存入相簿**：透過 Web Share API 叫出系統分享選單，選「儲存影像」即可存進相簿（瀏覽器下載只會進檔案資料夾）。
- 📴 **PWA 離線可用**：可「加入主畫面」以獨立視窗開啟，Service Worker 快取完整 App Shell，無網路也能使用。
- 🔒 **100% 隱私安全 (Privacy-First)**：所有圖像與影片資料皆在瀏覽器記憶體本地運算，不安裝、不上傳任何伺服器。
- 🎨 **現代暗黑玻璃擬態設計 (Glassmorphism)**：具備動態光暈、構圖三分法網格與完整手機版響應式佈局。

## 🌐 線上展示 (Live Demo)

- **GitHub Pages 網址**：[https://ivanusto.github.io/image-aspect-ratio-calculator/](https://ivanusto.github.io/image-aspect-ratio-calculator/)
- **作者個人網站**：[https://yblog.org](https://yblog.org)
- **作者 GitHub**：[@ivanusto](https://github.com/ivanusto)

## 🚀 本地開發與使用

本專案採用零依賴 (Zero Dependency) 的原生地道 HTML5 / CSS3 / JavaScript (ES6) 打造，無需安裝 Node.js 或建置工具。

### 直接在本機開啟：
複製專案後，雙擊開啟 `index.html`，或使用 Python 內建 HTTP Server：

```bash
git clone https://github.com/ivanusto/image-aspect-ratio-calculator.git
cd image-aspect-ratio-calculator
python -m http.server 8080
```

至瀏覽器存取 `http://localhost:8080` 即可。

## 🛠️ 更多免費實用線上工具

歡迎體驗同系列注重隱私的純前端線上工具：
- 🛡️ **[AI 浮水印與數位指紋清除器](https://ivanusto.github.io/watermarks-remover/)** — 免費清除 ChatGPT、Claude、Gemini 的隱形 Unicode 浮水印、C2PA 數位認證標記與圖片中繼資料。
- 📝 **[Markdown 轉 WordPress 格式轉換器](https://ivanusto.github.io/md-to-wordpress-converter/)** — 一鍵將 Markdown 文章轉換為 WordPress Gutenberg 原生區塊語法與乾淨 HTML。

## 📜 授權條款 (License)

本專案採用 [MIT License](LICENSE) 開源授權。
