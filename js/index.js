
const publicVapKey = 'BHos_KTEJ5BGTEKVR8uJfg3jEb_1ZZ-ZBcbza6O2ntvOMPo2aHLHEB-P7Tnimp_ExzWQUAO_me9_OzbGyinB9xc';

//when using your VAPID key in your web app, you'll need to convert the url safe based64 string
// to a Uin8Array to pass into the subscribe call

function urlBase64ToUint8Array(base64String) {
    const padding= "=".repeat((4-base64String.length % 4) % 4);
    const base64= (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
    const rawData= window.atob(base64);
    const outputArray= new Uint8Array(rawData.length);
    for(let i= 0; i< rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function postRegistration(subscription) {
    const serverUrl = '/subscribe'
    return new Promise((resolve, reject) => {
        if (subscription) {
            //build the URL to the app's API
            console.log(`Submittion subscription to ${serverUrl}`)
            //the data were passing to the server
            const data = {
                subscription: subscription,
                name: 'testing'
            };
            //POST the data to the server
            fetch(serverUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
            })
                .then(response => {
                    console.log('Received response from server')
                    if (response.status == 201) {
                        console.log('Subscription submitted')
                        response.json()
                            .then(data => {
                                resolve();
                            })
                    } else {
                        //tell the user it failed
                        console.log(`POST Erorr: ${response.statusText}`)
                        reject(response.statusText);
                    }
                })
        } else {
            reject('Missing endpoint value')
        }
    })
}

function doSubscribe() {
    Notification.requestPermission().then(result => {
        switch (result) {
            case 'granted':
                //the user gave permission
                //so we can go ahead and subscribe
                console.log('Permission granted')
                navigator.serviceWorker.ready.then(registration => {
                    console.log('checking subscription')
                    //check to make sure browser not already subscribed
                    registration.pushManager.getSubscription()
                        .then(subscription => {
                            if (subscription) {
                                console.log('Browser is already subscribed')
                                registration.showNotification('This notification les you know that you are already subscribed')
                                postRegistration(subscription)
                                    .then(() => {
                                        console.log('Subscription POSTed to server')
                                        updateUI()
                                    })
                                    .catch(error => console.error(error))
                            } else {
                                //subscribe the browser
                                console.log("Subscribing the browser")
                                var subOptions = {
                                    userVisibleOnly: true,
                                    applicationServerKey: urlBase64ToUint8Array(publicVapKey)
                                }
                                registration.pushManager.subscribe(subOptions)
                                    .then(subscription => {
                                        console.log("browser subscribed")
                                        registration.showNotification('This notif lets you know that you are subscribed')
                                        postRegistration(subscription)
                                            .then(() => {
                                                console.log('Subscription POSTed to server')
                                                updateUI()
                                            })
                                            .catch(error => console.error(error))
                                    })
                                    .catch(error => console.error(error))
                            }
                        })
                    updateUI()
                })
                break;
            case 'denied':
                // code block 
                console.log('You denied access to notifications.');
                updateUI();
                break;
            default:
                // the user closed the permissions dialog 
                // without making a selection console.warn('Default');
                console.log('Dialog closed without making a selection.');
                updateUI();
        }
    });
}

function doUnsubscribe() {
}

function updateUI() {
    console.log('updateUI()');
    // does the browser support notification?
    if (("Notification" in window)) {
      navigator.serviceWorker.ready.then(registration => {
        // check to make sure the browser isn't already subscribed
        registration.pushManager.getSubscription()
          .then(subscription => {
            if (subscription) {
              console.log('Browser is already subscribed');
              document.getElementById("subscribeDiv").style.display = 'none';
              document.getElementById("unsubscribeDiv").style.display = 'block';
            } else {
              // no? Then unhide the subscribe div
              document.getElementById("subscribeDiv").style.display = 'block';
              document.getElementById("unsubscribeDiv").style.display = 'none';
            }
          })
      });
    } else {
      // no? Then display a warning
      document.getElementById("noNotificationsWarning").style.display = 'block';
    }
  }

  // set the click event for the `Subscribe` button
document.getElementById("btnSubscribe").addEventListener("click", doSubscribe);
document.getElementById("btnUnsubscribe").addEventListener("click", doUnsubscribe);

// update the UI based on current subscription status
updateUI();