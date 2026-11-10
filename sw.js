var C="msd-v1";
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","index.html","manifest.json","icon-192.png","icon-512.png"])}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET"||e.request.url.indexOf("http")!==0)return;
e.respondWith(fetch(e.request).then(function(r){var d=r.clone();caches.open(C).then(function(c){c.put(e.request,d)});return r}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("index.html")})}))});
