const CACHE_NAME = "football";

var urlsToCache = [
    '/index.html',
    '/competitions.html',
    '/competition.html',
    '/favorite.html',
    '/favicon.ico',
    '/icon.png',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    '/detail.html',
    '/js/nav.js',
    '/main.js',
    '/idb.js',
    '/db.js',
    '/manifest.json',
    '/js/api.js',
    '/notif.js',
];

self.addEventListener("install",function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    )
})

self.addEventListener("fetch", function(event) {
    var base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch (event.request);
        })
      )
    }
  });

self.addEventListener("activate",function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheName !== CACHE_NAME){
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'img/icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });