const CACHE_PREFIX = 'phoenix-';
const CACHE_VERSION = 'phoenix-v0458-1';
const APP_SHELL = [
  './',
  './index.html',
  './css/app.css?v=0458-1',
  './css/A4DerivedLibraryDetail.css?v=0458-1',
  './components/LibraryDetail.css?v=0458-1',
  './components/PhoenixA4Poster.css?v=0458-1',
  './js/movement-catalog.js?v=0458-1',
  './components/RitualExercise.js?v=0458-1',
  './components/LibraryDetail.js?v=0458-1',
  './components/PhoenixA4Poster.js?v=0458-1',
  './js/app.js?v=0458-1',
  './data/movements/squat-chair.json',
  './data/movements/one-arm-row.json',
  './manifest.webmanifest',
  './assets/images/library/stepper.png',
  './assets/images/library/squat.png',
  './assets/images/library/bridge.png',
  './assets/images/library/row.png',
  './assets/images/library/press.png',
  './assets/images/library/roller.png',
  './assets/posters/v2/squat-vers-chaise-a4-v2.webp',
  './assets/posters/v2/tirage-un-bras-appui-a4-v2.webp',
  './assets/movements/squat-chair/hero.webp',
  './assets/movements/squat-chair/sequence.webp',
  './assets/movements/squat-chair/front-view.webp',
  './assets/movements/one-arm-row/hero.webp',
  './assets/movements/one-arm-row/sequence.webp',
  './assets/movements/one-arm-row/back-view.webp',
  './assets/images/ritual/stepper-v043.png',
  './assets/images/ritual/squat-v043.png',
  './assets/images/ritual/bridge-v043.png',
  './assets/images/ritual/row-v043.png',
  './assets/images/ritual/press-v043.png',
  './assets/images/ritual/roller-v043.png',
  './assets/images/ritual/breathing-v0454.svg',
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
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_VERSION)
        .map(key => caches.delete(key))))
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
