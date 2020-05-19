// Import URL Checker
import { urlCheck } from "./urlCheck"

// Submission of URL, API Call
function handleSubmit(event) {
    event.preventDefault();

    // Check the URL which was put into the formfield
    let url = document.getElementById("url").value;
    // If statement to check if the URL is not valid or valid
    if (!urlCheck(url)) {
        console.log("Your URL is not valid");
        return;
    }
    console.log("URL valid: please wait for the response")
    fetch("http://localhost:8080/sendText", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // body data type must match "Content-Type" header
    })
        .then(res => res.json())
        .then(function (response) {
            // Adding results into HTML
            document.getElementById("results").innerHTML = response.text;
            document.getElementById("polarity").innerHTML = response.polarity;
            document.getElementById("your-text").innerHTML = response.text;
        })
}


export { handleSubmit }

