// 오프라인에서도 열리도록 앱 파일을 저장해 둔다. 내용을 고치면 VERSION 숫자를 올릴 것.
const VERSION = 'stx-v4';
const FILES = ['./', 'index.html', 'styles.css', 'app.js', 'lessons.js', 'manifest.json', 'favicon.png', 'SolunaTex 연습 자료.xlsx', 'icon-180.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 인터넷 먼저, 안 되면 저장본
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (/\.png$/.test(new URL(e.request.url).pathname)) return; // 아이콘은 휴대폰이 직접 받게 둔다
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
