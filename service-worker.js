const CACHE_VERSION = 'phoenix-v042-1';
const APP_SHELL = [
  './',
  './index.html',
  './css/app.css',
  './js/app.js',
  './manifest.webmanifest',
  './assets/images/stepper.png',
  './assets/images/squat.png',
  './assets/images/bridge.png',
  './assets/images/row.png',
  './assets/images/press.png',
  './assets/images/roller.png',
  './assets/images/stepper-movement-v042.png',
  './assets/images/squat-movement-v042.png',
  './assets/images/bridge-movement-v042.png',
  './assets/images/row-movement-v042.png',
  './assets/images/press-movement-v042.png',
  './assets/images/roller-movement-v042.png',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
