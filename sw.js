const version = 'v1'
self.addEventListener('message', event => {
    console.log(`SW: Message event fired: ${event.data}`)
    console.dir(event)
    if (typeof event.data.action !== 'undefined') {
        console.log('SW: Action message received')
        let theAction = event.data.action;
        switch (theAction) {
            case 'messageSent':
                console.log('SW: Processing message')
                event.ports[0].postMessage('message received')
                break;
            default:
                console.log('SW: Unrecognized action')
        }
    } else {
        console.log('SW: Not an action')
    }
})

self.addEventListener('install', event => {
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
});

self.addEventListener('activate', event => {
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
});