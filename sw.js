var cacheStorageKey = 'wh-chat'

var cacheList = [
  "www",
  "www/Chat.png",
  "www/favicon.ico",
  "www/icon.icns",
  "www/index.html",
  "www/manifest.json",
  "www/script/Jessechat.js",
  "www/font/SF.eot",
  "www/font/SF.svg",
  "www/font/SF.ttf",
  "www/font/SF.woff",
  "www/styles/main.css",
  "www/styles/media.css",
  "www/top.ico"
]
//监听安装事件
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
    .then(cache => cache.addAll(CACHE_FILES)
      .then(() => self.skipWaiting())
    ));
});

//监听激活事件
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key, i) {
        if (key !== CACHE_VERSION) {
          return caches.delete(keys[i]);
        }
      }));
    })
  );
});

//总是更新策略
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_VERSION).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});