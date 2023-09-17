const DB_NAME = "chapter5"
const DB_VERSION = 1
const STORE_NAME = "email-store"

function openIDB() {
    //open the indexedDB database used by the app
    return new Promise((resolve, reject) => {
        //open the email database
        var theDB = self.indexedDB.open(DB_NAME, DB_VERSION)
        //success, callback
        theDB.onsuccess = function (event) {
            console.log('openIDB: Successfully opened database')
            //success, return the db object result
            resolve(event.target.result)
        }

        //define the databse error callback
        theDB.onerror = function(event) {
            let msg = `Database error ${theDB.error}`
            console.error(`openDB: ${msg}`)
            Swal.fire('Database Error', msg, 'error')
            //reject the promise, we failed
            //include the error message with the failure
            reject(msg)
        }

        theDB.onupgradeneeded = function(event) {
            console.log(`openIDB: Database upgrade needed`)
            // get a handle to the database
            var db = event.target.result
            // does the store already exist?
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                //no? Then create it
                console.log(`openIDB: Creating store ${STORE_NAME}`)
                //first create the config options for the store
                var storeOptions = {keyPath: 'idx', autoIncrement: true}
                // then create the store
                var theStore = db.createObjectStore(STORE_NAME, storeOptions)
            }
        }
    })
}

function queueEmail(db, email) {
    console.log('queueEmail')
    return new Promise((resolve, reject) => {
        let request = db.transaction([STORE_NAME], "readwrite")
            .objectStore(STORE_NAME)
            .add({ timestamp: Date.now(), email: email})

        request.onsuccess = function (event) {
            console.log('queueEmail: successfully added email')
            navigator.serviceWorker.ready.then(reg => {
                console.log('queueEmail: registering sync event')
                // fire off the sync request
                // to the service worker
                reg.sync.register('email')
                    .then(() => {
                        //tell the user
                        Swal.fire({
                            type: 'info',
                            title: 'Request Queued',
                            text: 'Your email was sent for submission to the server',
                            footer: 'Please refresh the page'
                        })
                        // and resolve promise
                        resolve()
                    })
                    .catch((error) => {
                        console.error('Error registering sync event:', error);
                        // No clue why this would happen
                        reject(error)
                })
            })
        }
        request.onerror = function(event) {
            // unable to create transaction
            reject(db.error)
        }
    })
}

function getEmailItems() {
    console.log('DB: getEmailItems()')

    // will hold the array of email items
    let items = [];

    return new Promise((resolve, reject) => {
        //yes, save the feedback to the database
        openIDB()
            .then(db => {
                let request = db.transaction([STORE_NAME], 'readonly')
                    .objectStore(STORE_NAME)
                    .openCursor()

                //success
                request.onsuccess = function (event) {
                    //get a handle to the cursor
                    var cursor = event.target.result
                    // do we have a valid cursor?
                    if (cursor) {
                        // add the feedback items to the array
                        items.push(cursor.value)
                        // move onto the next item in the object store
                        cursor.continue()
                    } else {
                        // no valid cursor, so must be at the end
                        resolve({
                            db: db,
                            items: items
                        })
                    }
                }
                //ugh, error
                request.onerror = function (event) {
                    console.error(request.error)
                    reject(request.error)
                }
            })  //openIDB()
            .catch(error => {
                console.error(request.error)
                reject(request.error)
            }) //openIDB()
    })
}

function deleteEmail(db, idx) {
    console.log(`DB: deleteEmail: Processing index ${idx}`)

    return new Promise((resolve, reject) => {
        //create a transaction
        let request = db.transaction([STORE_NAME], 'readwrite')
            .objectStore(STORE_NAME)
            .delete(idx)

        //success
        request.onsuccess = function(event) {
            console.log(`DB: deleteEmail: Item ${idx} deleted`)
            resolve(idx)
        }
        //ugh, error
        request.onerror = function (event) {
            console.log(`DB: deleteEmail: Unable to delete item ${idx}`)
            console.error(transaction.error)
            reject(transaction.error)
        }
    })
}