async function getColorNameFromHex(){
    const API_LINK = "https://www.thecolorapi.com/id?hex="
    // Format hex code to fit into url to obtain from the color api
    let hexTextField = document.getElementById('hexField').value.toLowerCase()
    let site_link = API_LINK.concat(hexTextField)

    let hexLink = {
        link: site_link
    }

    fetch("/getColor", {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(hexLink)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Color Name: " + data.text)
        })
        .catch((error) => {
            console.log("ERROR FETCH CLIENT-SIDE: " + error)
        })

}