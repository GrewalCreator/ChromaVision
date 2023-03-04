async function getColorNameFromHex(){
    console.log("Entry 1")
    // Step 1: format hex code to fit into url to obtain from the color api
    let hexTextField = document.getElementById('hexField').value.toLowerCase()
    let site_link = "https://www.thecolorapi.com/id?hex="
    site_link = site_link.concat(hexTextField)
    hexTextField = ''


    let tempLink = {
        link: site_link
    }

    // Step 2: fetch json object with data on specified color associated with hex code
    /*fetch(link, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify()
    })
        // Step 3: retrieve json object and turn it into a string
        .then(response => response.json())
        .then((res) => {
            console.log("DATA: " + res)
        })
        .catch(error => {
            console.log("Error getting response: " + error)
        })*/

    console.log("Entry 2")
    fetch("/getColor", {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(tempLink)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Color Name: " + data.text)
        })
        .catch((error) => {
            console.log("ERROR FETCH CLIENT-SIDE: " + error)
        })

    // Step 4: parse string and output relevant data (colour name)

}