// Import URL Checker
import { urlCheck } from "./urlCheck"

// Submission of URL, API Call
function handleSubmit(event) {
    event.preventDefault()

    //     // check what text was put into the form field
    //     let formText = document.getElementById('name').value
    //     Client.checkForName(formText)

    //     console.log("::: Form Submitted :::")
    //     fetch('http://localhost:8080/test')
    //         .then(res => res.json())
    //         .then(function (res) {
    //             document.getElementById('results').innerHTML = res.message
    //         })
    // }

    // Check the URL which was put into the formfield
    let url = document.getElementById("url").value;
    // If statement to check if the URL is not valid or valid
    if (!urlCheck(url)) {
        console.log("Your URL is not valid");
        return;
    }
    console.log("URL valid: please wait for the response")
    fetch("//localhost:8080/sendText", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // body data type must match "Content-Type" header
    })
        .then(respond => respond.json())
        .then(function (respond) {
            document.getElementById("results").innerHTML = respond.text;
            document.getElementById("polarity").innerHTML = respond.polarity;
            document.getElementById("your-text").innerHTML = respond.text
        })
}


export { handleSubmit }

