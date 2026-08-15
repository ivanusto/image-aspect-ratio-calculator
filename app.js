/**
 * Aspect Ratio Pro & Image/Video Cropper Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Internationalization (i18n) Dictionary & Engine ---
    const I18N_STRINGS = {
        'en': {
            'meta.title': 'Aspect Ratio & Crop Pro | Smart Image & Video Calculator',
            'meta.description': 'Free & privacy-first online aspect ratio calculator & cropper for images and videos. Instant crop, auto ratio calculation, and smart resizing.',
            'header.title': 'Aspect Ratio & Crop Pro',
            'header.subtitle': 'Privacy-First • 100% Client-Side • Instant Ratio Cropping & Resizing',
            'header.github': 'GitHub Repo',
            'input.section_title': 'Dimensions & File Input',
            'input.section_subtitle': "Paste text '1024 x 1280' or drop a file",
            'input.smart_label': 'Fast Paste & Smart Text Parser',
            'input.smart_placeholder': 'Paste e.g.: 1024 x 1280, 1024*1280 or 1024, 1280...',
            'input.paste_btn_title': 'Paste from Clipboard',
            'drop.desktop_title': 'Drag & drop image/video here, or click to browse',
            'drop.mobile_title': 'Tap to select image or video',
            'drop.desktop_hint': 'Supports JPG, PNG, WEBP, GIF, MP4, WEBM (Or press Ctrl+V to paste)',
            'drop.mobile_hint': 'Supports JPG, PNG, WEBP, GIF, MP4, WEBM',
            'input.width_label': 'Width',
            'input.width_placeholder': 'W (px)',
            'input.swap_title': 'Swap Width & Height',
            'input.height_label': 'Height',
            'input.height_placeholder': 'H (px)',
            'presets.title': 'Popular Ratios & Presets',
            'results.simplified_ratio': 'Simplified Ratio',
            'results.closest_match': 'Closest Standard Match',
            'results.norm_w': 'Normalized Ratio (W=1)',
            'results.norm_h': 'Normalized Ratio (H=1)',
            'results.total_px': 'Total Pixels & Quality',
            'results.copy_css': 'Copy CSS (aspect-ratio)',
            'preview.title': 'Live Visual Preview & Crop Viewport',
            'preview.grid_btn': 'Grid',
            'preview.grid_title': 'Toggle Rule-of-Thirds Grid',
            'crop.title': 'Image Aspect Cropper & HD Export',
            'crop.desc': 'Media loaded! Center-crop to target aspect ratio and export high quality images:',
            'crop.format_label': 'Export Format',
            'crop.format_jpg': 'JPG / JPEG (Best Compatibility)',
            'crop.format_png': 'PNG (Lossless High Quality)',
            'crop.format_webp': 'WEBP (Compact Size)',
            'crop.quality_label': 'Quality Level',
            'crop.fit_label': 'Crop Fit Mode',
            'crop.fit_cover': 'Cover (Center Crop)',
            'crop.fit_contain': 'Contain (Padded Fit)',
            'crop.share_btn': 'Crop & Save to Photos / Share',
            'crop.share_note': "On mobile devices, tap 'Save to Photos' above and choose 'Save Image' from system menu.",
            'scaler.title': 'Aspect Ratio Resizer Calculator',
            'scaler.width_label': 'Target Width',
            'scaler.width_placeholder': 'New Width',
            'scaler.height_label': 'Target Height',
            'scaler.height_placeholder': 'Calculated Height',
            'scaler.quick_scale': 'Quick Scale:',
            'ref.title': 'Standard Aspect Ratio Cheat Sheet (Click to Apply)',
            'ref.1_1': 'Square (1080×1080)',
            'ref.4_5': 'Social Post (1024×1280)',
            'ref.16_9': 'Landscape Video (1920×1080)',
            'ref.9_16': 'Stories / Reels / Shorts',
            'ref.4_3': 'Classic Display / iPad',
            'ref.3_2': 'DSLR Photo (35mm)',
            'ref.21_9': 'Ultrawide / Cinematic',
            'ref.2_3': 'Portrait Photo',
            'footer.link_wm': '🛡️ AI Watermarks Remover',
            'footer.link_wp': '📝 MD to WordPress Converter',
            'footer.link_repo': '🐙 GitHub Repo',
            'footer.text': 'Aspect Ratio & Crop Pro &copy; 2026 | Developed by <a href="https://github.com/ivanusto" target="_blank" rel="noopener">@ivanusto</a> | 100% Client-Side In-Browser • Privacy-First',

            // Dynamic Function Returns
            'tag.square': '<span class="tag-badge square"><i class="fa-solid fa-square"></i> Square</span>',
            'tag.landscape': '<span class="tag-badge landscape"><i class="fa-solid fa-desktop"></i> Landscape</span>',
            'tag.portrait': '<span class="tag-badge portrait"><i class="fa-solid fa-mobile-screen"></i> Portrait</span>',
            'accuracy_text': (acc, desc) => `Accuracy ${acc}% (${desc})`,
            'megapixels_text': (mp) => `~${mp} MP`,
            'recommendation_prefix': 'Best Suited For: ',
            'copy_ratio_btn': (ratio) => `Copy Ratio (${ratio})`,
            'btn_crop_image': '<i class="fa-solid fa-scissors"></i> Crop Image & Download',
            'btn_crop_video': '<i class="fa-solid fa-camera"></i> Capture Video Frame & Crop Download',
            'btn_crop_demo': '<i class="fa-solid fa-layer-group"></i> Generate Aspect Ratio Demo Card',
            'scaler_desc': (ratio) => `Locked aspect ratio (${ratio}). Enter new width or height:`,

            // Toast Messages
            'toast.pasted': 'Pasted and parsed dimensions successfully!',
            'toast.clipboard_permission': 'Please allow clipboard access permission',
            'toast.loaded_image': (w, h) => `Loaded image: ${w} × ${h} px`,
            'toast.loaded_video': (w, h) => `Loaded video: ${w} × ${h} px`,
            'toast.downloading': (sizeText) => `Downloading ${sizeText}... Saved to downloads folder.`,
            'toast.shared': (sizeText) => `Shared ${sizeText}. Choose 'Save Image' to save to photos.`,
            'toast.share_fallback': (sizeText) => `Cannot share format, downloading instead (${sizeText})`,
            'toast.share_error': (sizeText) => `Sharing failed, downloading instead (${sizeText})`,
            'toast.share_canceled': 'Canceled, image not saved.',
            'toast.copied_ratio': (ratio) => `Copied ratio: ${ratio}`,
            'toast.copied_css': (css) => `Copied CSS snippet: ${css}`,
            'toast.copied_stat': (val) => `Copied: ${val}`,
            'toast.copy_failed': 'Failed to copy',
            'toast.invalid_dim': 'Please enter valid dimensions'
        },
        'zh-TW': {
            'meta.title': '圖片與影片比例智慧計算與裁切器 | Aspect Ratio & Crop Pro',
            'meta.description': '免費且注重隱私的線上圖片與影片比例計算及即時裁切工具，支援拖曳貼圖、自動算比例、等比例縮放與一鍵匯出裁切圖片。',
            'header.title': '圖片影片比例計算與裁切',
            'header.subtitle': '隱私優先・純前端本地運算・一鍵比例裁切與縮放',
            'header.github': 'GitHub 專案',
            'input.section_title': '輸入尺寸或載入檔案',
            'input.section_subtitle': '貼上文字「1024 x 1280」或拖入圖片',
            'input.smart_label': '快速貼上 / 混合文字解析',
            'input.smart_placeholder': '貼上例如：1024 x 1280、1024*1280 或 1024, 1280...',
            'input.paste_btn_title': '從剪貼簿貼上',
            'drop.desktop_title': '拖曳圖片/影片檔案到此處，或點擊選擇檔案',
            'drop.mobile_title': '點擊選擇照片或影片',
            'drop.desktop_hint': '支援 JPG, PNG, WEBP, GIF, MP4, WEBM (直接 Ctrl+V 貼圖也可)',
            'drop.mobile_hint': '支援 JPG、PNG、WEBP、GIF、MP4、WEBM',
            'input.width_label': '寬度 (Width)',
            'input.width_placeholder': '寬 px',
            'input.swap_title': '對調寬高',
            'input.height_label': '高度 (Height)',
            'input.height_placeholder': '高 px',
            'presets.title': '常用快捷尺寸與比例',
            'results.simplified_ratio': '最簡整數比例',
            'results.closest_match': '最接近標準比例',
            'results.norm_w': '歸一化比例 (寬=1)',
            'results.norm_h': '歸一化比例 (高=1)',
            'results.total_px': '總像素與畫質',
            'results.copy_css': '複製 CSS (aspect-ratio)',
            'preview.title': '即時視覺預覽與裁切框',
            'preview.grid_btn': '網格',
            'preview.grid_title': '開關三分法輔助網格',
            'crop.title': '圖片智慧比例裁切與高畫質下載',
            'crop.desc': '已載入圖片，可以依照目標比例進行居中裁切並輸出新圖片文件：',
            'crop.format_label': '輸出格式',
            'crop.format_jpg': 'JPG / JPEG (相容性最佳)',
            'crop.format_png': 'PNG (無損高品質)',
            'crop.format_webp': 'WEBP (檔案小，相簿可能不支援)',
            'crop.quality_label': '畫質品質',
            'crop.fit_label': '裁切充填模式',
            'crop.fit_cover': 'Cover 滿版居中裁切',
            'crop.fit_contain': 'Contain 留白完整包含',
            'crop.share_btn': '裁切並存到相簿 / 分享',
            'crop.share_note': '手機請用上方「存到相簿」，在系統選單中選擇「儲存影像」。瀏覽器的下載只會存進檔案資料夾，不會進相簿。',
            'scaler.title': '依此比例等比例縮放算尺寸',
            'scaler.width_label': '目標寬度 (Target W)',
            'scaler.width_placeholder': '輸入新寬度',
            'scaler.height_label': '目標高度 (Target H)',
            'scaler.height_placeholder': '計算得出',
            'scaler.quick_scale': '常見放大/縮小：',
            'ref.title': '常見標準比例一覽表 (點擊直接套用)',
            'ref.1_1': '正方形 (1080×1080)',
            'ref.4_5': '社群貼文 (1024×1280)',
            'ref.16_9': '橫向影片 (1920×1080)',
            'ref.9_16': '限時動態 / Reels',
            'ref.4_3': '傳統螢幕 / iPad',
            'ref.3_2': '單眼相機相片',
            'ref.21_9': '超寬螢幕 / 電影',
            'ref.2_3': '直向寫真照',
            'footer.link_wm': '🛡️ AI 浮水印清除器',
            'footer.link_wp': '📝 MD 轉 WP 轉換器',
            'footer.link_repo': '🐙 GitHub 專案',
            'footer.text': '圖片與影片比例智慧計算與裁切器 &copy; 2026 | 開發者 <a href="https://github.com/ivanusto" target="_blank" rel="noopener">@ivanusto</a> | 100% 瀏覽器端本地運算・隱私守護',

            // Dynamic Function Returns
            'tag.square': '<span class="tag-badge square"><i class="fa-solid fa-square"></i> 正方形 (Square)</span>',
            'tag.landscape': '<span class="tag-badge landscape"><i class="fa-solid fa-desktop"></i> 橫向 (Landscape)</span>',
            'tag.portrait': '<span class="tag-badge portrait"><i class="fa-solid fa-mobile-screen"></i> 直向 (Portrait)</span>',
            'accuracy_text': (acc, desc) => `精確度 ${acc}% (${desc})`,
            'megapixels_text': (mp) => `約 ${mp} MP (百萬像素)`,
            'recommendation_prefix': '最佳適用場合：',
            'copy_ratio_btn': (ratio) => `複製比例 (${ratio})`,
            'btn_crop_image': '<i class="fa-solid fa-scissors"></i> 依當前比例裁切圖片並下載',
            'btn_crop_video': '<i class="fa-solid fa-camera"></i> 截取影片當前畫面並依比例裁切下載 (截圖)',
            'btn_crop_demo': '<i class="fa-solid fa-layer-group"></i> 產生當前比例示範圖卡下載',
            'scaler_desc': (ratio) => `鎖定目前比例 (${ratio})，輸入新的寬或高：`,

            // Toast Messages
            'toast.pasted': '已成功貼上並解析尺寸！',
            'toast.clipboard_permission': '請允許剪貼簿讀取權限',
            'toast.loaded_image': (w, h) => `已載入圖片: ${w} × ${h} px`,
            'toast.loaded_video': (w, h) => `已載入影片: ${w} × ${h} px`,
            'toast.downloading': (sizeText) => `已開始下載 ${sizeText}，檔案存於瀏覽器的下載位置`,
            'toast.shared': (sizeText) => `已送出 ${sizeText}，請在系統選單選「儲存影像」存入相簿`,
            'toast.share_fallback': (sizeText) => `此格式無法分享，已改為下載 (${sizeText})`,
            'toast.share_error': (sizeText) => `分享失敗，已改為下載 (${sizeText})`,
            'toast.share_canceled': '已取消，圖片未儲存',
            'toast.copied_ratio': (ratio) => `已複製比例：${ratio}`,
            'toast.copied_css': (css) => `已複製 CSS 代碼：${css}`,
            'toast.copied_stat': (val) => `已複製：${val}`,
            'toast.copy_failed': '複製失敗',
            'toast.invalid_dim': '請輸入有效尺寸'
        },
        'ja': {
            'meta.title': 'アスペクト比計算＆リアルタイム切り抜き | Aspect Ratio & Crop Pro',
            'meta.description': '完全無料＆プライバシー重視の画像・動画アスペクト比計算・切り抜きツール。自動アスペクト比計算、リサイズ、高画質エクスポートに対応。',
            'header.title': 'アスペクト比計算＆切り抜き',
            'header.subtitle': 'プライバシー重視・完全ローカル処理・一括トリミング＆リサイズ',
            'header.github': 'GitHub リポジトリ',
            'input.section_title': 'サイズ入力・ファイル読み込み',
            'input.section_subtitle': 'テキスト「1024 x 1280」貼り付けまたはファイルドラッグ',
            'input.smart_label': 'クイック貼り付け / テキスト自動解析',
            'input.smart_placeholder': '入力例：1024 x 1280、1024*1280、1024, 1280...',
            'input.paste_btn_title': 'クリップボードから貼り付け',
            'drop.desktop_title': 'ここに画像・動画ファイルをドラッグ＆ドロップ、またはクリックして選択',
            'drop.mobile_title': 'タップして写真や動画を選択',
            'drop.desktop_hint': '対応フォーマット: JPG, PNG, WEBP, GIF, MP4, WEBM (Ctrl+Vでの貼り付けも可能)',
            'drop.mobile_hint': '対応フォーマット: JPG、PNG、WEBP、GIF、MP4、WEBM',
            'input.width_label': '幅 (Width)',
            'input.width_placeholder': '幅 px',
            'input.swap_title': '縦横入れ替え',
            'input.height_label': '高さ (Height)',
            'input.height_placeholder': '高さ px',
            'presets.title': 'プリセットサイズ＆アスペクト比',
            'results.simplified_ratio': '最簡整数比',
            'results.closest_match': '最も近い標準比率',
            'results.norm_w': '正規化比率 (幅=1)',
            'results.norm_h': '正規化比率 (高さ=1)',
            'results.total_px': '総画素数と画質',
            'results.copy_css': 'CSSコピー (aspect-ratio)',
            'preview.title': 'リアルタイムプレビュー＆切り抜き表示',
            'preview.grid_btn': 'グリッド',
            'preview.grid_title': '三分割法グリッド表示切り替え',
            'crop.title': '画像アスペクト比切り抜き＆高画質保存',
            'crop.desc': 'ファイルを読み込みました。目標のアスペクト比で中央切り抜きして保存できます：',
            'crop.format_label': '出力フォーマット',
            'crop.format_jpg': 'JPG / JPEG (互換性優先)',
            'crop.format_png': 'PNG (無駄のない高画質)',
            'crop.format_webp': 'WEBP (軽量・高圧縮)',
            'crop.quality_label': '画質品質',
            'crop.fit_label': '切り抜きフィットモード',
            'crop.fit_cover': 'Cover (中央寄せトリミング)',
            'crop.fit_contain': 'Contain (全体表示・余白あり)',
            'crop.share_btn': '切り抜いて写真アプリへ保存 / 共有',
            'crop.share_note': 'スマホの場合は上の「写真アプリへ保存」をタップし、共有メニューで「画像を保存」を選択してください。',
            'scaler.title': '比率固定のリサイズ・寸法計算',
            'scaler.width_label': '目標の幅 (Target W)',
            'scaler.width_placeholder': '新しい幅を入力',
            'scaler.height_label': '目標の高さ (Target H)',
            'scaler.height_placeholder': '自動計算された高さ',
            'scaler.quick_scale': 'クイック倍率：',
            'ref.title': '標準アスペクト比一覧 (クリックで適用)',
            'ref.1_1': 'スクエア (1080×1080)',
            'ref.4_5': 'SNS投稿 (1024×1280)',
            'ref.16_9': '横型動画 (1920×1080)',
            'ref.9_16': 'ストーリーズ / Reels / Shorts',
            'ref.4_3': 'クラシック / iPad画面',
            'ref.3_2': '一眼レフ写真 (35mm)',
            'ref.21_9': 'ウルトラワイド / シネマ',
            'ref.2_3': '縦型ポートレート写真',
            'footer.link_wm': '🛡️ AI透かし除去ツール',
            'footer.link_wp': '📝 MD→WordPress変換',
            'footer.link_repo': '🐙 GitHub リポジトリ',
            'footer.text': 'アスペクト比計算＆切り抜き &copy; 2026 | 開発者 <a href="https://github.com/ivanusto" target="_blank" rel="noopener">@ivanusto</a> | 100% ブラウザ内ローカル処理・プライバシー保護',

            // Dynamic Function Returns
            'tag.square': '<span class="tag-badge square"><i class="fa-solid fa-square"></i> 正方形 (Square)</span>',
            'tag.landscape': '<span class="tag-badge landscape"><i class="fa-solid fa-desktop"></i> 横型 (Landscape)</span>',
            'tag.portrait': '<span class="tag-badge portrait"><i class="fa-solid fa-mobile-screen"></i> 縦型 (Portrait)</span>',
            'accuracy_text': (acc, desc) => `一致率 ${acc}% (${desc})`,
            'megapixels_text': (mp) => `約 ${mp} MP (メガピクセル)`,
            'recommendation_prefix': '推奨用途：',
            'copy_ratio_btn': (ratio) => `比率をコピー (${ratio})`,
            'btn_crop_image': '<i class="fa-solid fa-scissors"></i> この比率で画像を切り抜いてダウンロード',
            'btn_crop_video': '<i class="fa-solid fa-camera"></i> 動画の現在フレームを切り抜いて保存 (キャプチャ)',
            'btn_crop_demo': '<i class="fa-solid fa-layer-group"></i> サンプルカード画像を生成して保存',
            'scaler_desc': (ratio) => `現在の比率 (${ratio}) を固定中。新しい幅または高さを入力：`,

            // Toast Messages
            'toast.pasted': '貼り付けたテキストからサイズを解析しました！',
            'toast.clipboard_permission': 'クリップボードの読み取りアクセスを許可してください',
            'toast.loaded_image': (w, h) => `画像を読み込みました: ${w} × ${h} px`,
            'toast.loaded_video': (w, h) => `動画を読み込みました: ${w} × ${h} px`,
            'toast.downloading': (sizeText) => `${sizeText} のダウンロードを開始しました。`,
            'toast.shared': (sizeText) => `${sizeText} を送信しました。「画像を保存」を選択してください。`,
            'toast.share_fallback': (sizeText) => `このフォーマットは共有できないため、ダウンロードします (${sizeText})`,
            'toast.share_error': (sizeText) => `共有に失敗したため、ダウンロードを開始します (${sizeText})`,
            'toast.share_canceled': 'キャンセルされました。画像は保存されていません。',
            'toast.copied_ratio': (ratio) => `比率をコピーしました：${ratio}`,
            'toast.copied_css': (css) => `CSSコードをコピーしました：${css}`,
            'toast.copied_stat': (val) => `コピーしました：${val}`,
            'toast.copy_failed': 'コピーに失敗しました',
            'toast.invalid_dim': '有効なサイズを入力してください'
        }
    };

    function getInitialLanguage() {
        const saved = localStorage.getItem('app_lang');
        if (saved && (saved === 'zh-TW' || saved === 'en' || saved === 'ja')) {
            return saved;
        }

        const userLangs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
        for (let lang of userLangs) {
            if (!lang) continue;
            const l = lang.toLowerCase();
            if (l.startsWith('ja')) return 'ja';
            if (l.startsWith('zh')) return 'zh-TW';
        }

        return 'en';
    }

    let currentLang = getInitialLanguage();

    function getI18nStr(key, ...args) {
        const langObj = I18N_STRINGS[currentLang] || I18N_STRINGS['en'];
        const val = langObj[key] || I18N_STRINGS['en'][key] || '';
        if (typeof val === 'function') {
            return val(...args);
        }
        return val;
    }

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('app_lang', lang);
        document.documentElement.lang = lang;

        const langSelect = document.getElementById('langSelect');
        if (langSelect && langSelect.value !== lang) {
            langSelect.value = lang;
        }

        // Apply textContent to [data-i18n]
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const str = getI18nStr(key);
            if (key === 'meta.title') {
                document.title = str;
            } else if (key === 'footer.text') {
                el.innerHTML = str;
            } else if (str) {
                el.textContent = str;
            }
        });

        // Apply meta description
        const metaDescEl = document.getElementById('metaDescription');
        if (metaDescEl) {
            metaDescEl.setAttribute('content', getI18nStr('meta.description'));
        }

        // Apply placeholders to [data-i18n-placeholder]
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            const str = getI18nStr(key);
            if (str) el.placeholder = str;
        });

        // Apply titles to [data-i18n-title]
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            const str = getI18nStr(key);
            if (str) el.title = str;
        });

        // Update Footer
        const footerText = document.getElementById('footerText');
        if (footerText) {
            footerText.innerHTML = getI18nStr('footer.text');
        }

        // Re-run calculations to update dynamic labels
        if (typeof updateCalculations === 'function') {
            updateCalculations();
        }
    }

    // DOM Elements
    const langSelect = document.getElementById('langSelect');
    const smartInput = document.getElementById('smartInput');
    const pasteBtn = document.getElementById('pasteBtn');
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    const swapBtn = document.getElementById('swapBtn');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    // Displays
    const simpleRatioDisplay = document.getElementById('simpleRatioDisplay');
    const ratioOrientationTag = document.getElementById('ratioOrientationTag');
    const closestStandardRatio = document.getElementById('closestStandardRatio');
    const closestAccuracy = document.getElementById('closestAccuracy');
    const normalizedW = document.getElementById('normalizedW');
    const normalizedH = document.getElementById('normalizedH');
    const totalPixels = document.getElementById('totalPixels');
    const megapixels = document.getElementById('megapixels');
    const recommendationText = document.getElementById('recommendationText');
    const currentLockRatioText = document.getElementById('currentLockRatioText');
    const scalerSubDesc = document.getElementById('scalerSubDesc');

    // Visual Box & Image/Video Preview
    const aspectBox = document.getElementById('aspectBox');
    const boxDimensionsTag = document.getElementById('boxDimensionsTag');
    const boxRatioCenter = document.getElementById('boxRatioCenter');
    const previewImg = document.getElementById('previewImg');
    const previewVideo = document.getElementById('previewVideo');
    const toggleGridBtn = document.getElementById('toggleGridBtn');
    const gridOverlay = document.getElementById('gridOverlay');

    // Scaler
    const scaleWidth = document.getElementById('scaleWidth');
    const scaleHeight = document.getElementById('scaleHeight');

    // Crop Studio Controls
    const exportFormat = document.getElementById('exportFormat');
    const exportQuality = document.getElementById('exportQuality');
    const qualityValText = document.getElementById('qualityValText');
    const cropFitMode = document.getElementById('cropFitMode');
    const exportCropBtn = document.getElementById('exportCropBtn');
    const exportCropBtnText = document.getElementById('exportCropBtnText');
    const exportShareBtn = document.getElementById('exportShareBtn');
    const exportShareNote = document.getElementById('exportShareNote');
    const hiddenExportCanvas = document.getElementById('hiddenExportCanvas');

    // Copy Buttons & Toast
    const copyRatioBtn = document.getElementById('copyRatioBtn');
    const copyRatioBtnText = document.getElementById('copyRatioBtnText');
    const copyCssBtn = document.getElementById('copyCssBtn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    // Preset standard ratios definition
    const STANDARD_RATIOS = [
        { w: 1, h: 1, name: "1:1", desc_zh: "正方形貼文 / 頭像", desc_en: "Square post / Avatar", desc_ja: "スクエア投稿 / アイコン" },
        { w: 4, h: 5, name: "4:5", desc_zh: "Instagram 垂直貼文", desc_en: "Instagram vertical post", desc_ja: "Instagram 縦型投稿" },
        { w: 3, h: 4, name: "3:4", desc_zh: "電商商品圖 / 平板照", desc_en: "E-commerce / Tablet photo", desc_ja: "EC商品画像 / タブレット写真" },
        { w: 2, h: 3, name: "2:3", desc_zh: "單眼直向照 / 海報", desc_en: "DSLR portrait / Poster", desc_ja: "一眼レフ縦構図 / ポスター" },
        { w: 9, h: 16, name: "9:16", desc_zh: "Reels / TikTok / 限時動態", desc_en: "Reels / TikTok / Story", desc_ja: "リール / TikTok / ストーリーズ" },
        { w: 4, h: 3, name: "4:3", desc_zh: "傳統相機 / iPad 螢幕", desc_en: "Classic camera / iPad screen", desc_ja: "クラシックカメラ / iPad画面" },
        { w: 3, h: 2, name: "3:2", desc_zh: "35mm 標準相片", desc_en: "35mm standard photo", desc_ja: "35mm 標準写真" },
        { w: 16, h: 9, name: "16:9", desc_zh: "YouTube / 簡報 / 電視", desc_en: "YouTube / Presentation / TV", desc_ja: "YouTube / プレゼン / テレビ" },
        { w: 1.91, h: 1, name: "1.91:1", desc_zh: "FB / Twitter 橫向連結圖", desc_en: "FB / Twitter landscape card", desc_ja: "X / FB 横型カード画像" },
        { w: 21, h: 9, name: "21:9", desc_zh: "超寬螢幕 / 電影比例", desc_en: "Ultrawide / Cinema format", desc_ja: "ウルトラワイド / シネマ比率" }
    ];

    // Loaded Media Reference
    let loadedImageObj = null;
    let loadedVideoObj = null;

    // Current State
    let state = {
        width: 1024,
        height: 1280,
        aspectRatioVal: 1024 / 1280,
        simpleW: 4,
        simpleH: 5
    };

    // --- Language Selector Listener ---
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
        });
    }

    // --- Helper Math Functions ---
    function gcd(a, b) {
        a = Math.round(Math.abs(a));
        b = Math.round(Math.abs(b));
        if (b === 0) return a;
        return gcd(b, a % b);
    }

    function getSimplifiedRatio(w, h) {
        if (!w || !h || w <= 0 || h <= 0) return { sw: 1, sh: 1, str: "1:1" };
        
        let scale = 1;
        while (!Number.isInteger(w * scale) || !Number.isInteger(h * scale)) {
            scale *= 10;
            if (scale > 10000) break;
        }

        let intW = Math.round(w * scale);
        let intH = Math.round(h * scale);
        let divisor = gcd(intW, intH);

        let sw = intW / divisor;
        let sh = intH / divisor;

        if (sw > 100 || sh > 100) {
            const approx = approximateFraction(w / h);
            const approxSuffix = currentLang === 'zh-TW' ? ' (約)' : (currentLang === 'ja' ? ' (概算)' : ' (approx)');
            return { sw: approx[0], sh: approx[1], str: `${approx[0]} : ${approx[1]}${approxSuffix}` };
        }

        return { sw, sh, str: `${sw} : ${sh}` };
    }

    function approximateFraction(decimal, maxDenominator = 100) {
        let bestNum = 1, bestDen = 1, minErr = Math.abs(decimal - 1);
        for (let den = 1; den <= maxDenominator; den++) {
            let num = Math.round(decimal * den);
            let err = Math.abs(decimal - (num / den));
            if (err < minErr) {
                minErr = err;
                bestNum = num;
                bestDen = den;
            }
        }
        return [bestNum, bestDen];
    }

    function findClosestStandardRatio(targetRatio) {
        let closest = STANDARD_RATIOS[0];
        let minDiff = Math.abs(targetRatio - (closest.w / closest.h));

        STANDARD_RATIOS.forEach(r => {
            let diff = Math.abs(targetRatio - (r.w / r.h));
            if (diff < minDiff) {
                minDiff = diff;
                closest = r;
            }
        });

        let accuracy = Math.max(0, 100 - (minDiff / targetRatio) * 100).toFixed(1);
        return { closest, accuracy };
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // --- Main Update Function ---
    function updateCalculations(source = 'discrete') {
        const w = parseFloat(widthInput.value) || 0;
        const h = parseFloat(heightInput.value) || 0;

        if (w <= 0 || h <= 0) {
            simpleRatioDisplay.textContent = getI18nStr('toast.invalid_dim');
            return;
        }

        state.width = w;
        state.height = h;
        const currentRatio = w / h;
        state.aspectRatioVal = currentRatio;

        // 1. Simplified Ratio
        const ratioInfo = getSimplifiedRatio(w, h);
        state.simpleW = ratioInfo.sw;
        state.simpleH = ratioInfo.sh;
        simpleRatioDisplay.textContent = ratioInfo.str;

        // 2. Orientation Tag
        if (Math.abs(w - h) < 0.01) {
            ratioOrientationTag.innerHTML = getI18nStr('tag.square');
        } else if (w > h) {
            ratioOrientationTag.innerHTML = getI18nStr('tag.landscape');
        } else {
            ratioOrientationTag.innerHTML = getI18nStr('tag.portrait');
        }

        // 3. Closest Standard Match
        const match = findClosestStandardRatio(currentRatio);
        closestStandardRatio.textContent = match.closest.name;
        const matchDesc = currentLang === 'zh-TW' ? match.closest.desc_zh : (currentLang === 'ja' ? match.closest.desc_ja : match.closest.desc_en);
        closestAccuracy.textContent = getI18nStr('accuracy_text', match.accuracy, matchDesc);

        // 4. Normalized Ratios
        normalizedW.textContent = `1 : ${(1 / currentRatio).toFixed(3)}`;
        normalizedH.textContent = `${currentRatio.toFixed(3)} : 1`;

        // 5. Total Pixels & Megapixels
        const totalPx = Math.round(w * h);
        const mp = (totalPx / 1000000).toFixed(2);
        totalPixels.textContent = `${formatNumber(totalPx)} px`;
        megapixels.textContent = getI18nStr('megapixels_text', mp);

        // 6. Usage Recommendations
        updateRecommendations(w, h, currentRatio, match.closest);

        // 7. Update Visual Box Preview
        updateVisualBox(w, h, ratioInfo.str);

        // 8. Update Lock Ratio Text & Scaler
        currentLockRatioText.textContent = ratioInfo.str;
        if (scalerSubDesc) {
            scalerSubDesc.innerHTML = getI18nStr('scaler_desc', `<span id="currentLockRatioText">${ratioInfo.str}</span>`);
        }

        if (source !== 'scaleW' && source !== 'scaleH') {
            scaleWidth.value = w;
            scaleHeight.value = h;
        }

        if (source === 'discrete' || source === 'preset' || source === 'file') {
            smartInput.value = `${w} x ${h}`;
        }

        // 9. Update Copy Ratio Button Label
        if (copyRatioBtnText) {
            copyRatioBtnText.textContent = getI18nStr('copy_ratio_btn', ratioInfo.str);
        }

        // Update Crop Button text state
        updateCropBtnState();
    }

    function updateCropBtnState() {
        let btnHtml = '';
        if (loadedImageObj) {
            btnHtml = getI18nStr('btn_crop_image');
        } else if (loadedVideoObj) {
            btnHtml = getI18nStr('btn_crop_video');
        } else {
            btnHtml = getI18nStr('btn_crop_demo');
        }

        if (exportCropBtnText) {
            exportCropBtnText.innerHTML = btnHtml;
        } else {
            exportCropBtn.innerHTML = btnHtml;
        }
    }

    function updateRecommendations(w, h, ratio, closest) {
        let recs = [];
        const isEn = currentLang === 'en';
        const isJa = currentLang === 'ja';

        if (Math.abs(ratio - 1) < 0.05) {
            if (isJa) recs = ["Instagram スクエア投稿", "SNSプロフィール画像", "アイコン画像"];
            else if (isEn) recs = ["Instagram Post", "Profile Avatar", "App Icon"];
            else recs = ["Instagram 正方形貼文", "社群大頭貼", "商品圖標"];
        } else if (Math.abs(ratio - (4/5)) < 0.05) {
            if (isJa) recs = ["Instagram 縦型投稿 (ノーカット)", "Pinterest ピン", "スマホ壁紙"];
            else if (isEn) recs = ["Instagram Vertical Post (Full Frame)", "Pinterest Pin", "Phone Wallpaper"];
            else recs = ["Instagram 垂直貼文 (滿版不剪裁)", "Pinterest 垂直圖", "手機壁紙"];
        } else if (Math.abs(ratio - (9/16)) < 0.05) {
            if (isJa) recs = ["Instagram ストーリーズ", "TikTok / Shorts ショート動画", "スマホ全画面壁紙"];
            else if (isEn) recs = ["Instagram Story", "TikTok / Shorts", "Full Screen Mobile Wallpaper"];
            else recs = ["Instagram Story 限時動態", "TikTok / Shorts 短影音", "手機全螢幕桌布"];
        } else if (Math.abs(ratio - (16/9)) < 0.05) {
            if (isJa) recs = ["YouTube 動画＆サムネイル", "プレゼンスライド (16:9)", "PC壁紙", "テレビ画面"];
            else if (isEn) recs = ["YouTube Video & Thumbnail", "Presentation Slides (16:9)", "Desktop Wallpaper", "HDTV Screen"];
            else recs = ["YouTube 影片與封面", "簡報PPT (16:9)", "電腦桌布", "標準電視螢幕"];
        } else if (Math.abs(ratio - (3/2)) < 0.05 || Math.abs(ratio - (2/3)) < 0.05) {
            if (isJa) recs = ["カメラ RAW 原寸写真", "L判・KGサイズプリント", "写真展ギャラリー"];
            else if (isEn) recs = ["DSLR Raw Photo", "Photo Print (4x6\")", "Gallery Photography"];
            else recs = ["相機 Raw 原生照片", "相片沖印 (4x6 吋)", "藝廊攝影展覽"];
        } else if (Math.abs(ratio - (21/9)) < 0.08) {
            if (isJa) recs = ["ウルトラワイドゲーミングモニター", "映画シネマアスペクト比", "Webサイトヘッダーバナー"];
            else if (isEn) recs = ["Ultrawide Gaming Monitor", "Cinematic Film View", "Website Hero Banner"];
            else recs = ["超寬電競螢幕", "電影膠卷視角", "網站全幅 Header banner"];
        } else {
            const desc = isJa ? closest.desc_ja : (isEn ? closest.desc_en : closest.desc_zh);
            if (isJa) recs.push(`最も近い表示: ${closest.name} (${desc})`);
            else if (isEn) recs.push(`Best matching ${closest.name} (${desc})`);
            else recs.push(`最接近 ${closest.name} 展現 (${desc})`);
        }

        const prefix = getI18nStr('recommendation_prefix');
        const separator = (isEn || isJa) ? ', ' : '、';
        recommendationText.textContent = `${prefix}${recs.join(separator)}`;
    }

    function updateVisualBox(w, h, ratioStr) {
        const viewport = document.getElementById('viewport');
        const maxW = viewport.clientWidth - 48;
        const maxH = viewport.clientHeight - 48;

        let boxW, boxH;

        if (w / h > maxW / maxH) {
            boxW = maxW;
            boxH = maxW * (h / w);
        } else {
            boxH = maxH;
            boxW = maxH * (w / h);
        }

        aspectBox.style.width = `${Math.max(40, boxW)}px`;
        aspectBox.style.height = `${Math.max(40, boxH)}px`;

        boxDimensionsTag.textContent = `${w} × ${h}`;
        boxRatioCenter.textContent = ratioStr;
    }

    // Smart Input Parser
    function parseSmartInput(str) {
        if (!str) return;
        const matches = str.match(/([0-9]+(?:\.[0-9]+)?)/g);
        if (matches && matches.length >= 2) {
            const w = parseFloat(matches[0]);
            const h = parseFloat(matches[1]);
            if (w > 0 && h > 0) {
                widthInput.value = w;
                heightInput.value = h;
                updateCalculations('smart');
            }
        }
    }

    smartInput.addEventListener('input', (e) => parseSmartInput(e.target.value));
    widthInput.addEventListener('input', () => updateCalculations('discrete'));
    heightInput.addEventListener('input', () => updateCalculations('discrete'));

    swapBtn.addEventListener('click', () => {
        const temp = widthInput.value;
        widthInput.value = heightInput.value;
        heightInput.value = temp;
        updateCalculations('discrete');
    });

    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            smartInput.value = text;
            parseSmartInput(text);
            showToast(getI18nStr('toast.pasted'));
        } catch (err) {
            showToast(getI18nStr('toast.clipboard_permission'));
        }
    });

    document.querySelectorAll('.preset-chips .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.preset-chips .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            widthInput.value = chip.dataset.w;
            heightInput.value = chip.dataset.h;
            updateCalculations('preset');
        });
    });

    const presetChips = document.querySelector('.preset-chips');
    let railStartSlack = 0;

    function updatePresetFade() {
        const overflow = presetChips.scrollWidth - presetChips.clientWidth;
        if (overflow <= 1) {
            presetChips.dataset.fade = 'none';
            return;
        }
        const atStart = presetChips.scrollLeft <= railStartSlack + 1;
        const atEnd = presetChips.scrollLeft >= overflow - 1;
        presetChips.dataset.fade = atStart ? 'right' : (atEnd ? 'left' : 'both');
    }

    function measurePresetRail() {
        railStartSlack = parseFloat(getComputedStyle(presetChips).paddingLeft) || 0;
        updatePresetFade();
    }

    presetChips.addEventListener('scroll', updatePresetFade, { passive: true });
    window.addEventListener('resize', measurePresetRail);
    measurePresetRail();

    document.querySelectorAll('.ref-item').forEach(item => {
        item.addEventListener('click', () => {
            const rw = parseFloat(item.dataset.aspectW);
            const rh = parseFloat(item.dataset.aspectH);
            const currentW = parseFloat(widthInput.value) || 1920;
            widthInput.value = currentW;
            heightInput.value = Math.round(currentW * (rh / rw));
            updateCalculations('preset');
        });
    });

    // --- File Handling (Image & Video) ---
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleMediaFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            handleMediaFile(e.target.files[0]);
        }
    });

    window.addEventListener('paste', (e) => {
        const items = e.clipboardData && e.clipboardData.items;
        if (items) {
            for (let item of items) {
                if (item.type.indexOf('image') !== -1 || item.type.indexOf('video') !== -1) {
                    const file = item.getAsFile();
                    handleMediaFile(file);
                    break;
                }
            }
        }
    });

    function handleMediaFile(file) {
        if (!file) return;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    loadedImageObj = img;
                    loadedVideoObj = null;

                    widthInput.value = img.naturalWidth;
                    heightInput.value = img.naturalHeight;
                    
                    previewVideo.classList.add('hidden');
                    previewImg.src = event.target.result;
                    previewImg.classList.remove('hidden');

                    updateCalculations('file');
                    showToast(getI18nStr('toast.loaded_image', img.naturalWidth, img.naturalHeight));
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
            const videoUrl = URL.createObjectURL(file);
            previewVideo.src = videoUrl;
            previewVideo.onloadedmetadata = () => {
                loadedVideoObj = previewVideo;
                loadedImageObj = null;

                widthInput.value = previewVideo.videoWidth;
                heightInput.value = previewVideo.videoHeight;

                previewImg.classList.add('hidden');
                previewVideo.classList.remove('hidden');

                updateCalculations('file');
                showToast(getI18nStr('toast.loaded_video', previewVideo.videoWidth, previewVideo.videoHeight));
            };
        }
    }

    // Toggle Grid Overlay
    toggleGridBtn.addEventListener('click', () => {
        toggleGridBtn.classList.toggle('active');
        gridOverlay.classList.toggle('hidden');
    });

    // Quality Range Slider Text
    exportQuality.addEventListener('input', () => {
        qualityValText.textContent = `${exportQuality.value}%`;
    });

    // --- Image & Video Crop/Screenshot Export Engine ---
    function canShareFiles() {
        if (typeof navigator.share !== 'function' || typeof navigator.canShare !== 'function') return false;
        try {
            const probe = new File([new Blob(['x'], { type: 'image/jpeg' })], 'probe.jpg', { type: 'image/jpeg' });
            return navigator.canShare({ files: [probe] });
        } catch (e) {
            return false;
        }
    }

    const shareSupported = canShareFiles();
    if (shareSupported) {
        exportShareBtn.classList.remove('hidden');
        exportShareNote.classList.remove('hidden');
        exportCropBtn.classList.remove('primary');
        exportCropBtn.classList.add('secondary');
    }

    exportShareBtn.addEventListener('click', () => runExport('share'));
    exportCropBtn.addEventListener('click', () => runExport('download'));

    function runExport(mode) {
        if (loadedImageObj) {
            cropAndExportMedia(loadedImageObj, 'image', mode);
        } else if (loadedVideoObj) {
            cropAndExportMedia(loadedVideoObj, 'video', mode);
        } else {
            cropPlaceholderImage(mode);
        }
    }

    function cropPlaceholderImage(mode) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = state.width;
        tempCanvas.height = state.height;
        const ctx = tempCanvas.getContext('2d');

        const grad = ctx.createLinearGradient(0, 0, state.width, state.height);
        grad.addColorStop(0, '#6366F1');
        grad.addColorStop(1, '#06B6D4');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, state.width, state.height);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 42px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`AspectRatioPro ${state.simpleW}:${state.simpleH}`, state.width / 2, state.height / 2);

        cropAndExportMedia(tempCanvas, 'demo', mode);
    }

    function cropAndExportMedia(mediaSource, type, mode) {
        const targetRatio = state.aspectRatioVal; // W / H
        const fitMode = cropFitMode.value;

        let srcW, srcH;
        if (type === 'video') {
            srcW = mediaSource.videoWidth;
            srcH = mediaSource.videoHeight;
        } else {
            srcW = mediaSource.naturalWidth || mediaSource.width;
            srcH = mediaSource.naturalHeight || mediaSource.height;
        }

        let cropW, cropH, cropX, cropY;
        let outW, outH;

        if (fitMode === 'cover') {
            const srcRatio = srcW / srcH;
            if (srcRatio > targetRatio) {
                cropH = srcH;
                cropW = srcH * targetRatio;
                cropX = (srcW - cropW) / 2;
                cropY = 0;
            } else {
                cropW = srcW;
                cropH = srcW / targetRatio;
                cropX = 0;
                cropY = (srcH - cropH) / 2;
            }
            outW = Math.round(cropW);
            outH = Math.round(cropH);
        } else {
            outW = srcW;
            outH = Math.round(srcW / targetRatio);
            cropW = srcW;
            cropH = srcH;
            cropX = 0;
            cropY = 0;
        }

        hiddenExportCanvas.width = outW;
        hiddenExportCanvas.height = outH;

        const ctx = hiddenExportCanvas.getContext('2d');
        ctx.clearRect(0, 0, outW, outH);

        if (fitMode === 'contain') {
            ctx.fillStyle = '#0B0F19';
            ctx.fillRect(0, 0, outW, outH);
            const drawX = 0;
            const drawY = (outH - srcH) / 2;
            ctx.drawImage(mediaSource, 0, 0, srcW, srcH, drawX, drawY, srcW, srcH);
        } else {
            ctx.drawImage(mediaSource, cropX, cropY, cropW, cropH, 0, 0, outW, outH);
        }

        const mimeType = exportFormat.value;
        const quality = parseFloat(exportQuality.value) / 100;
        const ext = mimeType === 'image/jpeg' ? 'jpg' : (mimeType === 'image/png' ? 'png' : 'webp');

        const dataUrl = hiddenExportCanvas.toDataURL(mimeType, quality);
        const blob = dataUrlToBlob(dataUrl);

        const prefix = type === 'video' ? 'video_screenshot' : (type === 'demo' ? 'demo_card' : 'cropped');
        const fileName = `${prefix}_${outW}x${outH}_${state.simpleW}x${state.simpleH}.${ext}`;
        const sizeText = `${outW} × ${outH} px`;

        if (mode === 'share' && shareSupported) {
            shareImageFile(blob, fileName, mimeType, sizeText);
        } else {
            downloadBlob(blob, fileName);
            showToast(getI18nStr('toast.downloading', sizeText));
        }
    }

    function dataUrlToBlob(dataUrl) {
        const commaIdx = dataUrl.indexOf(',');
        const header = dataUrl.slice(0, commaIdx);
        const mime = header.slice(header.indexOf(':') + 1, header.indexOf(';'));
        const binary = atob(dataUrl.slice(commaIdx + 1));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new Blob([bytes], { type: mime });
    }

    function downloadBlob(blob, fileName) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    }

    function shareImageFile(blob, fileName, mimeType, sizeText) {
        const file = new File([blob], fileName, { type: mimeType });

        if (!navigator.canShare({ files: [file] })) {
            downloadBlob(blob, fileName);
            showToast(getI18nStr('toast.share_fallback', sizeText));
            return;
        }

        navigator.share({ files: [file] })
            .then(() => {
                showToast(getI18nStr('toast.shared', sizeText));
            })
            .catch((err) => {
                if (err && err.name === 'AbortError') {
                    showToast(getI18nStr('toast.share_canceled'));
                    return;
                }
                downloadBlob(blob, fileName);
                showToast(getI18nStr('toast.share_error', sizeText));
            });
    }

    // --- Scaler Calculator ---
    scaleWidth.addEventListener('input', () => {
        const targetW = parseFloat(scaleWidth.value);
        if (targetW > 0 && state.aspectRatioVal > 0) {
            scaleHeight.value = Math.round(targetW / state.aspectRatioVal);
        }
    });

    scaleHeight.addEventListener('input', () => {
        const targetH = parseFloat(scaleHeight.value);
        if (targetH > 0 && state.aspectRatioVal > 0) {
            scaleWidth.value = Math.round(targetH * state.aspectRatioVal);
        }
    });

    document.querySelectorAll('.quick-scale-btns .btn-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            const factor = parseFloat(btn.dataset.scale);
            const newW = Math.round(state.width * factor);
            const newH = Math.round(state.height * factor);
            scaleWidth.value = newW;
            scaleHeight.value = newH;
        });
    });

    // --- Copy Actions ---
    copyRatioBtn.addEventListener('click', () => {
        const ratioStr = simpleRatioDisplay.textContent;
        copyToClipboard(ratioStr, getI18nStr('toast.copied_ratio', ratioStr));
    });

    copyCssBtn.addEventListener('click', () => {
        const cssSnippet = `aspect-ratio: ${state.simpleW} / ${state.simpleH};`;
        copyToClipboard(cssSnippet, getI18nStr('toast.copied_css', cssSnippet));
    });

    document.querySelectorAll('[data-copy-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.copyTarget;
            const text = document.getElementById(targetId).textContent;
            copyToClipboard(text, getI18nStr('toast.copied_stat', text));
        });
    });

    function copyToClipboard(text, msg) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(msg);
        }).catch(() => {
            showToast(getI18nStr('toast.copy_failed'));
        });
    }

    function showToast(msg) {
        toastMsg.textContent = msg;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2800);
    }

    // Initialize Language & Calculations
    applyLanguage(currentLang);

    window.addEventListener('resize', () => {
        updateVisualBox(state.width, state.height, `${state.simpleW} : ${state.simpleH}`);
    });
});
