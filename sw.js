/* Updating content.js/modules.js in the same GitHub repository never requires reinstalling. */
const CACHE='viva-deutsch-studio-a1-v2.0';
const CORE=['./','./index.html','./modules.js','./app.js','./study-data.js','./studio.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('viva-deutsch-studio')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 event.respondWith(fetch(req).then(res=>{if(res.ok){const cloned=res.clone();caches.open(CACHE).then(c=>c.put(req,cloned)).catch(()=>{});}return res;}).catch(async()=>await caches.match(req)||await caches.match('./index.html')));
});
