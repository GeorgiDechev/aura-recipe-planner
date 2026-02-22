const CACHE_NAME = 'aura-cooking-v2';
const ASSETS = [
    './',
    './index.html',
    './src/styles/main.css',
    './src/main.js',
    './src/api.js',
    './manifest.json',
    './src/assets/icon-192.png',
    './src/assets/icon-512.png'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    // Exclude API calls from cache
    if (e.request.url.includes('generativelanguage.googleapis.com')) {
        return;
    }

    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
