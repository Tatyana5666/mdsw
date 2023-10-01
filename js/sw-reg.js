// does the browser support service workers? 
if ('serviceWorker' in navigator) {
    // then register our service worker 
    navigator.serviceWorker.register('./sw.js')
        .then(function (reg) {
            // display a success message
            console.log(`Service Worker Registration (Scope: ${reg.scope})`);
        })
        .catch(function (error) {
            // display an error message
            console.log(`Service Worker Error (${error})`);
        });
} else {
    // happens when the app isn't served over a TLS connection (HTTPS)
    console.warn('Service Worker not available');
}