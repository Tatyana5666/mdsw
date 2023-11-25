if(!self.define){let e,i={};const o=(o,r)=>(o=new URL(o+".js",r).href,i[o]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=o,e.onload=i,document.head.appendChild(e)}else e=o,importScripts(o),i()})).then((()=>{let e=i[o];if(!e)throw new Error(`Module ${o} didn’t register its module`);return e})));self.define=(r,s)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let t={};const c=e=>o(e,n),d={module:{uri:n},exports:t,require:c};i[n]=Promise.all(r.map((e=>d[e]||c(e)))).then((e=>(s(...e),t)))}}define(["./workbox-75db6ee2"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"6b5eac43d127ff00c7f2af8d3460ab72"},{url:"movies.js",revision:"c3685984aa096448df20319d1ac25f1c"},{url:"package-lock.json",revision:"c109459ea39c523d31f48b4cec0044bb"},{url:"package.json",revision:"196776f7123db4d611f9d4ee9197337e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map


importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

RegExp.escape = function(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
workbox.routing.registerRoute(
    new
    RegExp(RegExp.escape('https://api.themoviedb.org/3/movie/popular?api_key=a98026d8a521fe3109abb07a30103c93&language=en-US&page=1')),
    workbox.strategies.cacheFirst({
        cacheName: 'movies',
    })
)


self.addEventListener('install', event => {
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
});