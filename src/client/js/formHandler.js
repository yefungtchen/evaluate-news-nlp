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
            console.log("Aylien results listed below")
            console.log(response);
            // Adding results into HTML
            document.getElementById("your-text").innerHTML = response.text;
            document.getElementById("polarity").innerHTML = response.polarity;
            document.getElementById("polarity_confidence").innerHTML = response.polarity_confidence;
            document.getElementById("subjectivity").innerHTML = response.subjectivity;
            document.getElementById("subjectivity_confidence").innerHTML = response.subjectivity_confidence;
        })
}

export { handleSubmit }

