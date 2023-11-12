if(!self.define){let e,i={};const n=(n,c)=>(n=new URL(n+".js",c).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const d=e=>n(e,o),f={module:{uri:o},exports:r,require:d};i[o]=Promise.all(c.map((e=>f[e]||d(e)))).then((e=>(s(...e),r)))}}define(["./workbox-75db6ee2"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/main.css",revision:"743d6bf88d9ddf0575b98314589192d6"},{url:"images/icons/icon-128x128.png",revision:"71b5c99438ee24d1cfc4ff2781eca280"},{url:"images/icons/icon-144x144.png",revision:"5cef91de1be95f6f52405d59b9412218"},{url:"images/icons/icon-152x152.png",revision:"aa3f7c0cdccff24836416ff4c001859a"},{url:"images/icons/icon-192x192.png",revision:"b8a72da6171b71e21b9edd0bda9c3d7a"},{url:"images/icons/icon-384x384.png",revision:"9fd19c9a46dde8eb37b6ca7d417fd095"},{url:"images/icons/icon-512x512.png",revision:"3016b0d87aed6f7886286651fc89e2f0"},{url:"images/icons/icon-72x72.png",revision:"0fde8e5ea3ff88cd60bb2f174ddc952d"},{url:"images/icons/icon-96x96.png",revision:"9ab1bc3f02307064958bc937d653dba9"},{url:"index.html",revision:"0413cb7481e82e3315c2f90139e8fccf"},{url:"js/app.js",revision:"e056fbf9766a55c808be2b848bcabf6c"},{url:"package.json",revision:"f3d1a988a835245d44352864efbb2a59"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

// Get the names
workbox.routing.registerRoute(
    new RegExp('https://jsonplaceholder.typicode.com/users'),
    workbox.strategies.cacheFirst()
)

workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic.com)/(.*)'),
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30,
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
)