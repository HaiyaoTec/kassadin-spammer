var cacheName = 'EearningRhino'

self.addEventListener('install', event => {
  self.skipWaiting()
  // event.waitUntil(
  //   caches.open(cacheName)
  //   .then(cache => cache.addAll([
  //     '/',
  //     '/login'
  //   ]))
  // )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  )
})