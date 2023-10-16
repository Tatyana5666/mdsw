navigator.serviceWorker.addEventListener('message', event => {
    console.log('Message listener fired');
    console.dir(event);
}, false)

function sendMessage() {
    console.log('sendMessage()')
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = function (event) {
        console.log('Message received on channel')
        console.dir(event.data)
        document.getElementById("messageText").value=event.data;
    };
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(registration => {
                console.dir(navigator.serviceWorker.controller)
                navigator.serviceWorker.controller.postMessage({
                    action: 'messageSent',
                    content: document.getElementById("messageText").value
                }, [messageChannel.port2])
            })
            .catch(error => {
                console.log('Service Worker not available')
            })
    }

}

document.getElementById("btnMessage").addEventListener("click", sendMessage)