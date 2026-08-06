/**
 * Aspect Ratio Pro & Image/Video Cropper Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
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
    const exportShareBtn = document.getElementById('exportShareBtn');
    const exportShareNote = document.getElementById('exportShareNote');
    const hiddenExportCanvas = document.getElementById('hiddenExportCanvas');

    // Copy Buttons & Toast
    const copyRatioBtn = document.getElementById('copyRatioBtn');
    const copyCssBtn = document.getElementById('copyCssBtn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    // Preset standard ratios definition
    const STANDARD_RATIOS = [
        { w: 1, h: 1, name: "1:1", desc: "正方形貼文 / 頭像" },
        { w: 4, h: 5, name: "4:5", desc: "Instagram 垂直貼文" },
        { w: 3, h: 4, name: "3:4", desc: "電商商品圖 / 平板照" },
        { w: 2, h: 3, name: "2:3", desc: "單眼直向照 / 海報" },
        { w: 9, h: 16, name: "9:16", desc: "Reels / TikTok / 限時動態" },
        { w: 4, h: 3, name: "4:3", desc: "傳統相機 / iPad 螢幕" },
        { w: 3, h: 2, name: "3:2", desc: "35mm 標準相片" },
        { w: 16, h: 9, name: "16:9", desc: "YouTube / 簡報 / 電視" },
        { w: 1.91, h: 1, name: "1.91:1", desc: "FB / Twitter 橫向連結圖" },
        { w: 21, h: 9, name: "21:9", desc: "超寬螢幕 / 電影比例" }
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
            return { sw: approx[0], sh: approx[1], str: `${approx[0]} : ${approx[1]} (約)` };
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
            simpleRatioDisplay.textContent = "請輸入有效尺寸";
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
            ratioOrientationTag.innerHTML = `<span class="tag-badge square"><i class="fa-solid fa-square"></i> 正方形 (Square)</span>`;
        } else if (w > h) {
            ratioOrientationTag.innerHTML = `<span class="tag-badge landscape"><i class="fa-solid fa-desktop"></i> 橫向 (Landscape)</span>`;
        } else {
            ratioOrientationTag.innerHTML = `<span class="tag-badge portrait"><i class="fa-solid fa-mobile-screen"></i> 直向 (Portrait)</span>`;
        }

        // 3. Closest Standard Match
        const match = findClosestStandardRatio(currentRatio);
        closestStandardRatio.textContent = match.closest.name;
        closestAccuracy.textContent = `精確度 ${match.accuracy}% (${match.closest.desc})`;

        // 4. Normalized Ratios
        normalizedW.textContent = `1 : ${(1 / currentRatio).toFixed(3)}`;
        normalizedH.textContent = `${currentRatio.toFixed(3)} : 1`;

        // 5. Total Pixels & Megapixels
        const totalPx = Math.round(w * h);
        const mp = (totalPx / 1000000).toFixed(2);
        totalPixels.textContent = `${formatNumber(totalPx)} px`;
        megapixels.textContent = `約 ${mp} MP (百萬像素)`;

        // 6. Usage Recommendations
        updateRecommendations(w, h, currentRatio, match.closest);

        // 7. Update Visual Box Preview
        updateVisualBox(w, h, ratioInfo.str);

        // 8. Update Lock Ratio Text & Scaler
        currentLockRatioText.textContent = ratioInfo.str;
        if (source !== 'scaleW' && source !== 'scaleH') {
            scaleWidth.value = w;
            scaleHeight.value = h;
        }

        if (source === 'discrete' || source === 'preset' || source === 'file') {
            smartInput.value = `${w} x ${h}`;
        }

        // Update Crop Button text state
        updateCropBtnState();
    }

    function updateCropBtnState() {
        if (loadedImageObj) {
            exportCropBtn.innerHTML = `<i class="fa-solid fa-scissors"></i> 依當前比例裁切圖片並下載`;
        } else if (loadedVideoObj) {
            exportCropBtn.innerHTML = `<i class="fa-solid fa-camera"></i> 截取影片當前畫面並依比例裁切下載 (截圖)`;
        } else {
            exportCropBtn.innerHTML = `<i class="fa-solid fa-layer-group"></i> 產生當前比例示範圖卡下載`;
        }
    }

    function updateRecommendations(w, h, ratio, closest) {
        let recs = [];

        if (Math.abs(ratio - 1) < 0.05) {
            recs.push("Instagram 正方形貼文", "社群大頭貼", "商品圖標");
        } else if (Math.abs(ratio - (4/5)) < 0.05) {
            recs.push("Instagram 垂直貼文 (滿版不剪裁)", "Pinterest 垂直圖", "手機壁紙");
        } else if (Math.abs(ratio - (9/16)) < 0.05) {
            recs.push("Instagram Story 限時動態", "TikTok / Shorts 短影音", "手機全螢幕桌布");
        } else if (Math.abs(ratio - (16/9)) < 0.05) {
            recs.push("YouTube 影片與封面", "簡報PPT (16:9)", "電腦桌布", "標準電視螢幕");
        } else if (Math.abs(ratio - (3/2)) < 0.05 || Math.abs(ratio - (2/3)) < 0.05) {
            recs.push("相機 Raw 原生照片", "相片沖印 (4x6 吋)", "藝廊攝影展覽");
        } else if (Math.abs(ratio - (21/9)) < 0.08) {
            recs.push("超寬電競螢幕", "電影膠卷視角", "網站全幅 Header banner");
        } else {
            recs.push(`最接近 ${closest.name} 展現 (${closest.desc})`);
        }

        recommendationText.textContent = `最佳適用場合：${recs.join('、')}`;
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
            showToast("已成功貼上並解析尺寸！");
        } catch (err) {
            showToast("請允許剪貼簿讀取權限");
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

    // Fade whichever edge of the preset rail still has chips hidden behind it,
    // so it reads as scrollable rather than just looking cut off.
    const presetChips = document.querySelector('.preset-chips');

    // scroll-snap parks the rail on the first chip's edge, not on 0, so the
    // resting "start" position is the container's left padding. Measured rather
    // than hardcoded because that padding only exists at mobile widths.
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
                    showToast(`已載入圖片: ${img.naturalWidth} × ${img.naturalHeight} px`);
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
                showToast(`已載入影片: ${previewVideo.videoWidth} × ${previewVideo.videoHeight} px`);
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

    // Web Share Level 2 lets the OS share sheet save straight into the photo library,
    // which a plain download can never do. Only offer it when files are actually shareable.
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
            // Process Uploaded Image
            cropAndExportMedia(loadedImageObj, 'image', mode);
        } else if (loadedVideoObj) {
            // Capture Current Frame of Video
            cropAndExportMedia(loadedVideoObj, 'video', mode);
        } else {
            // Generate Demo Color Card
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

        // Pass the canvas straight to drawImage — routing through an Image would make this
        // async and Safari would drop the user gesture that navigator.share() requires.
        cropAndExportMedia(tempCanvas, 'demo', mode);
    }

    function cropAndExportMedia(mediaSource, type, mode) {
        const targetRatio = state.aspectRatioVal; // W / H
        const fitMode = cropFitMode.value;

        // Get natural width and height from Image or Video
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
            // Center Crop
            const srcRatio = srcW / srcH;
            if (srcRatio > targetRatio) {
                // Source is wider, crop sides
                cropH = srcH;
                cropW = srcH * targetRatio;
                cropX = (srcW - cropW) / 2;
                cropY = 0;
            } else {
                // Source is taller, crop top/bottom
                cropW = srcW;
                cropH = srcW / targetRatio;
                cropX = 0;
                cropY = (srcH - cropH) / 2;
            }
            outW = Math.round(cropW);
            outH = Math.round(cropH);
        } else {
            // Contain (Padded)
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

        // Export Format & Quality
        const mimeType = exportFormat.value;
        const quality = parseFloat(exportQuality.value) / 100;
        const ext = mimeType === 'image/jpeg' ? 'jpg' : (mimeType === 'image/png' ? 'png' : 'webp');

        // toDataURL is synchronous; toBlob is not. Staying synchronous keeps the click's
        // transient activation alive so Safari accepts the navigator.share() call below.
        const dataUrl = hiddenExportCanvas.toDataURL(mimeType, quality);
        const blob = dataUrlToBlob(dataUrl);

        const prefix = type === 'video' ? 'video_screenshot' : (type === 'demo' ? 'demo_card' : 'cropped');
        const fileName = `${prefix}_${outW}x${outH}_${state.simpleW}x${state.simpleH}.${ext}`;
        const sizeText = `${outW} × ${outH} px`;

        if (mode === 'share' && shareSupported) {
            shareImageFile(blob, fileName, mimeType, sizeText);
        } else {
            downloadBlob(blob, fileName);
            showToast(`已開始下載 ${sizeText}，檔案存於瀏覽器的下載位置`);
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
        // Give the browser a moment to start the transfer before releasing the object URL.
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    }

    function shareImageFile(blob, fileName, mimeType, sizeText) {
        const file = new File([blob], fileName, { type: mimeType });

        if (!navigator.canShare({ files: [file] })) {
            downloadBlob(blob, fileName);
            showToast(`此格式無法分享，已改為下載 (${sizeText})`);
            return;
        }

        navigator.share({ files: [file] })
            .then(() => {
                showToast(`已送出 ${sizeText}，請在系統選單選「儲存影像」存入相簿`);
            })
            .catch((err) => {
                if (err && err.name === 'AbortError') {
                    showToast('已取消，圖片未儲存');
                    return;
                }
                downloadBlob(blob, fileName);
                showToast(`分享失敗，已改為下載 (${sizeText})`);
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
        copyToClipboard(ratioStr, `已複製比例：${ratioStr}`);
    });

    copyCssBtn.addEventListener('click', () => {
        const cssSnippet = `aspect-ratio: ${state.simpleW} / ${state.simpleH};`;
        copyToClipboard(cssSnippet, `已複製 CSS 代碼：${cssSnippet}`);
    });

    document.querySelectorAll('[data-copy-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.copyTarget;
            const text = document.getElementById(targetId).textContent;
            copyToClipboard(text, `已複製：${text}`);
        });
    });

    function copyToClipboard(text, msg) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(msg);
        }).catch(() => {
            showToast("複製失敗");
        });
    }

    function showToast(msg) {
        toastMsg.textContent = msg;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2800);
    }

    updateCalculations('discrete');

    window.addEventListener('resize', () => {
        updateVisualBox(state.width, state.height, `${state.simpleW} : ${state.simpleH}`);
    });
});
