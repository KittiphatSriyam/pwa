const staticCachName = 'site-static'
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
]

self.addEventListener('install', (event) => {
    // console.log('service worker has been installed');
    event.waitUntil(
        caches.open(staticCachName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets)
        })
    )
})

self.addEventListener('activate', (event) => {
    //console.log('service worker has been activated');
    event.waitUntil(
        caches.keys().then(keys => {
            // console.log('keys->>', keys);
            return Promise.all(
                keys.filter(key => key !== staticCachName)
                    .map(key => caches.delete(key))
            )
        })
    )
})
self.addEventListener('fetch', (event) => {
    console.log('fetch event', event);
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request)
        })
    )
})

