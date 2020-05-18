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

    let url = document.getElementById("url").value;
    if (!urlCheck(url)) {
        console.log("Your URL is not valid");
        return;
    }
}


export { handleSubmit }

