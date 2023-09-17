self.addEventListener('sync', event => {
    console.log('SW: sync event fired')
    // Ignoring everything in the sync event because it deletes what is in the database
    // But it does delete, if you want to remove the commenting
    /*
    if (event.tag === 'email') {
        console.log('SW: Processing Email Sync');
        event.waitUntil(
            getEmailItems()
                .then(data => {
                    return Promise.all(
                        // loop through the items array
                        data.items.map(function (EmailItem) {
                            //update the server if you can
                            console.log(`SW: Updating Server ${EmailItem.value}`)
                            //successfully posted
                            // so whack the record at idx
                            console.log(`SW: Deleting Email ${EmailItem.idx}`)
                            return deleteEmail(data.db, EmailItem.idx)
                        })
                    )
                }));
            } else {
        // this should never happen
        console.log(`SW: Unrecognized sync event (${event.tag})`)
    }
     */
    console.log('SW: sync event finished')
})

self.addEventListener('install', event => {
    console.log("SW: install event fired")
    self.importScripts('./js/db.js')
})