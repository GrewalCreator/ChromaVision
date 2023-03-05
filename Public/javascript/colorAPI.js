async function getColorNameFromHex(hexVal){

    const API_LINK = "https://www.thecolorapi.com/id?hex="
    // Format hex code to fit into url to obtain from the color api
    let site_link = API_LINK.concat(hexVal)
    let colourOutput = undefined

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
            colourOutput = data.text
        })
        .catch((error) => {
            console.log("ERROR FETCH CLIENT-SIDE: " + error)
        })

    return colourOutput;
}

async function getAverageRGB(RGB_arr){
    let rgb = [0,0,0]

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < RGB_arr.length; ++j){
            rgb[i] += RGB_arr[j].data[i]
        }
        rgb[i] = Math.floor(rgb[i] / RGB_arr.length);
    }
    console.log(rgb)

    return rgb
}
