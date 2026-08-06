# アスペクト比＆即時トリミング (Aspect Ratio & Crop Pro)

🌐 **Languages / 多言語**: [English](README.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

> モダンでプライバシー重視、100% ブラウザ内で動作する画像・動画のアスペクト比計算およびリアルタイム切り抜き Web アプリケーション。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-emerald.svg)](https://ivanusto.github.io/image-aspect-ratio-calculator/)
[![Author](https://img.shields.io/badge/Author-ivanusto-indigo.svg)](https://github.com/ivanusto)
[![Blog](https://img.shields.io/badge/Blog-yblog.org-cyan.svg)](https://yblog.org)

## ✨ 主な特徴

- ⚡ **スマートテキスト解析**：`1024 x 1280`、`1024*1280`、`1024, 1280` などの貼り付けテキストから最簡整数比 `4 : 5` を即座に計算。
- 🖼️ **画像・動画ファイルの読み込み**：ドラッグ＆ドロップまたは `Ctrl + V` で画像 (JPG, PNG, WEBP) や動画 (MP4, WEBM) を貼り付け、元の解像度を自動解析。
- ✂️ **HTML5 Canvas ローカルトリミング＆出力**：目標のアスペクト比に合わせて中央寄せトリミングし、**WEBP / PNG / JPG** フォーマットおよび品質スライダーで高速書き出し。
- 📐 **等倍ズーム・リサイズ計算機能**：アスペクト比を固定したまま幅・高さを自由計算。50%、75%、150%、200% のクイックプリセットボタンを搭載。
- 🎯 **標準アスペクト比・プラットフォーム推測**：Instagram (4:5 / 1:1)、TikTok/Reels (9:16)、YouTube (16:9) などの最適な用途を自動提案。
- 📲 **写真アプリへ直接保存**：Web Share API を利用してスマホの標準共有メニューを呼び出し、「画像を保存」で写真ライブラリに保存可能。
- 📴 **PWA オフライン対応**：ホーム画面に追加して独立ウィンドウで起動可能。Service Worker によるキャッシュでオフラインでも利用可能。
- 🔒 **100% プライバシー保護 (Privacy-First)**：すべての画像・動画データはブラウザのメモリ内のみで処理され、サーバーへの送信は一切行いません。
- 🎨 **現代的なダークグラスモフィズムデザイン**：動的なライティングエフェクト、三分割法の構図グリッド、完全レスポンシブデザインを搭載。

## 🌐 オンラインデモ (Live Demo)

- **GitHub Pages**：[https://ivanusto.github.io/image-aspect-ratio-calculator/](https://ivanusto.github.io/image-aspect-ratio-calculator/)
- **制作者ウェブサイト**：[https://yblog.org](https://yblog.org)
- **制作者 GitHub**：[@ivanusto](https://github.com/ivanusto)

## 🚀 ローカルでの開発と実行

Node.js やビルドツール不要。標準的な HTML5 / CSS3 / JavaScript (ES6) のみで構築されています。

### ローカルで開く：
リポジトリをクローンし、`index.html` をダブルクリックするか、Python の内蔵 HTTP サーバーを起動します：

```bash
git clone https://github.com/ivanusto/image-aspect-ratio-calculator.git
cd image-aspect-ratio-calculator
python -m http.server 8080
```

ブラウザで `http://localhost:8080` にアクセスしてください。

## 📜 ライセンス (License)

本プロジェクトは [MIT License](LICENSE) のもとで公開されています。
