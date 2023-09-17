function submitEmail() {
    console.log('submitEmail()');
    // get the selected item from the form
    let inputtedEmail = document.getElementById("inputemail").value;
    console.log(`Inputted Email: ${inputtedEmail}`);
    // do we have a sentiment value? We should.
    if (inputtedEmail) {
        console.log('there is an inputted email')
        // push it to the database
        openIDB()
            .then(db => {
                queueEmail(db, inputtedEmail)
                    .then(() => console.log('queuedEmail'))
                    .catch(error => console.error(error))
            })
    }
    console.log('input email is finished')
}

// Is this how I'm supposed to push to database?
document.getElementById("inputemailbutton").addEventListener("click", submitEmail);