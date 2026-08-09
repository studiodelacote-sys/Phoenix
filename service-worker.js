const CACHE_VERSION = 'phoenix-v043-2';
const APP_SHELL = [
  './',
  './index.html',
  './css/app.css',
  './js/app.js',
  './manifest.webmanifest',
  './assets/images/library/stepper.png',
  './assets/images/library/squat.png',
  './assets/images/library/bridge.png',
  './assets/images/library/row.png',
  './assets/images/library/press.png',
  './assets/images/library/roller.png',
  './assets/images/ritual/stepper-v043.png',
  './assets/images/ritual/squat-v043.png',
  './assets/images/ritual/bridge-v043.png',
  './assets/images/ritual/row-v043.png',
  './assets/images/ritual/press-v043.png',
  './assets/images/ritual/roller-v043.png',
  './assets/images/fullscreen/stepper-v043.png',
  './assets/images/fullscreen/squat-v043.png',
  './assets/images/fullscreen/bridge-v043.png',
  './assets/images/fullscreen/row-v043.png',
  './assets/images/fullscreen/press-v043.png',
  './assets/images/fullscreen/roller-v043.png',
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
