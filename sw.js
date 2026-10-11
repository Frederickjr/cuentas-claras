const CACHE_NAME = 'cuentas-claras-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Instalar el service worker y guardar en caché los archivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las solicitudes para asegurar que la app funcione y sea instalable
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo si está en caché, si no, búscalo en la red
        return response || fetch(event.request);
      })
  );
});