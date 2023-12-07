/// <reference lib="WebWorker" />

// export empty type because of tsc --isolatedModules flag
export type {};
declare const self: ServiceWorkerGlobalScope;

const STATIC_CACHE = '';
const INMUTABLE_CACHE = '';
const DYNAMIC_CACHE = '';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      return cache.addAll(['/', '/offline']);
    })
  );
});
