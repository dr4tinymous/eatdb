const CACHE_NAME = 'eatdb-v1';
const STATIC_CACHE_FILES = [
    '/',
    '/css/styles.css',
];

// Installation of the Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_CACHE_FILES);
        })
    );
});

// Fetch event for Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
    // Check if the request method is GET, we don't want to cache other methods like POST
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Fetch from the network in the background
            const fetchFromNetwork = fetch(event.request).then((networkResponse) => {
                // Clone the response because response objects can be used only once
                let clonedResponse = networkResponse.clone();
                
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, clonedResponse);
                });

                return networkResponse;
            });

            // If cached, return cached response, else fetch from network
            return cachedResponse || fetchFromNetwork;
        })
    );
});

// Activation of the Service Worker and cleanup of old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
