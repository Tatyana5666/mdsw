const express= require("express");
const webpush= require("web-push");
const bodyParser= require("body-parser");
// path is for wokring with file and directory paths
const path= require("path");
// initialize express
const app = express();
app.use(bodyParser.json());
// Set static path
app.use(express.static(path.join(__dirname, "/")));

const publicVapKey = 'BHos_KTEJ5BGTEKVR8uJfg3jEb_1ZZ-ZBcbza6O2ntvOMPo2aHLHEB-P7Tnimp_ExzWQUAO_me9_OzbGyinB9xc';
const privateVapKey = 'LG4tfyrA21qyxSsKCMpLLsbmzp0DKRcuI-dtQM_EvAM';

webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapKey,
    privateVapKey
)

//subscribe route
app.post("/subscribe", (request, response) => {
    //Get pushSubscription object
    const subscription = request.body

    // send 201 - resource created successfully
    response.status(201).json({});

    //create payload
    const payload = JSON.stringify({title: "Push Test"})

    //pass object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err))
});

//run the server on port 5000
const port = 5000
app.listen(port, () => console.log(`Server started on port ${port}`))

