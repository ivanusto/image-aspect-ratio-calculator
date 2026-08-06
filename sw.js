/**
 * Service Worker — offline shell for Aspect Ratio & Crop Pro
 *
 * Bump CACHE_VERSION on every release. The old cache is dropped on activate,
 * and skipWaiting + clients.claim mean a returning visitor never gets stuck on
 * a stale build waiting for every tab to close.
 */
const CACHE_VERSION = 'v2';
const CACHE_NAME = `arc-pro-${CACHE_VERSION}`;

// Relative to the SW's own scope, so this keeps working under the
// /image-aspect-ratio-calculator/ subpath GitHub Pages serves from.
const APP_SHELL = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icons/favicon-32.png',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-512-maskable.png',
    './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            // addAll is atomic: one 404 would discard the whole precache, and the
            // CDN entries below are fetched opportunistically instead.
            .then((cache) => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((k) => k.startsWith('arc-pro-') && k !== CACHE_NAME)
                    .map((k) => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    const sameOrigin = url.origin === self.location.origin;

    // Navigations: network first, so a deploy shows up immediately when online,
    // then fall back to the cached shell when offline.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
                    return response;
                })
                .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
        );
        return;
    }

    // Everything else: cache first, refresh in the background. Covers the app
    // shell and the Google Fonts / FontAwesome CDN assets, whose opaque
    // responses are still replayable offline.
    event.respondWith(
        caches.match(request).then((cached) => {
            const network = fetch(request)
                .then((response) => {
                    if (response && (response.ok || response.type === 'opaque')) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(() => cached);

            return cached || network;
        })
    );
});
