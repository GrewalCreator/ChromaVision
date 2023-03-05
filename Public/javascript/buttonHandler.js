let VIDEO_CONSTRAINTS = {
    video: {
        width: {
            min: 128,
            ideal: 512,
            max: 1024,
        },
        height: {
            min: 512,
            ideal: 256,
            max: 720,
        },

        facingMode: "user"
    },
}

const video = document.querySelector('#camera_video');
let videoStream = undefined;
const img = document.createElement("img");
const canvas = document.querySelector("#canvas");

async function camera_button() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        await navigator.mediaDevices.getUserMedia(VIDEO_CONSTRAINTS)
            .catch(DOMException => {
                console.log("ERROR: " + DOMException);
                alert("Browser May Not Support Camera API")
                return -1;
            }).catch(function (error) {
                console.log("Error: " + error);
                alert("Camera API Is Not Available")
                return -1;
            })
            .then(function () {
                console.log("Instead Do This")
                displayVideo();
            })

        document.getElementById("activate_camera_button").remove();

        return 0;
    }
}


function screenshot(){
    video.pause();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png")


    video.play()
}

async function displayVideo(){
    const video = document.querySelector('#camera_video')

    // Video Stream
    videoStream = await navigator.mediaDevices.getUserMedia(VIDEO_CONSTRAINTS)
    video.srcObject = videoStream
}

async function reset(){
    location.reload()
}


async function getPixelColor(event) {
    let rect = canvas.getBoundingClientRect();
    const TOLERANCE = 1;
    if(img.src !== ''){
        let context = canvas.getContext("2d");
        let X = event.x - Math.floor(TOLERANCE/2) - rect.left;
        let Y = event.y - rect.top - Math.floor(TOLERANCE/2);
        console.log(`cursor at ${event.x}, ${event.y}`)
        console.log(`calculation accounting for offset: ${event.x-rect.left}, ${event.y-rect.top}`)
        console.log(`Rect's dimensions are x: ${rect.right - rect.left}, y: ${rect.bottom-rect.top}`)
        let RGB_arr = [];

        for(let i = 0; i < TOLERANCE; ++i){
            ++Y;
            X = X - (TOLERANCE - 1);
            for(let j = 0; j < TOLERANCE; ++j){
                let RGB = context.getImageData(X, Y, 1, 1);
                RGB_arr.push(RGB)
                ++X;
            }
        }
        let averageRGB;
        averageRGB = await getAverageRGB(RGB_arr);


        let hexValue = ((averageRGB[0].toString(16)) + (averageRGB[1].toString(16)) + (averageRGB[2].toString(16)));
        await getColorNameFromHex(hexValue);



        let textDiv = document.getElementById("color_info");
        textDiv.innerHTML = '';
        textDiv.innerHTML += `<p id = "retrievedInfo">HexValue: ${hexValue}<\p>`;
        textDiv.innerHTML += `<p id = "retrievedInfo">RGBValue: ${averageRGB}<\p>`;
        textDiv.innerHTML += `<div id="outputcolor" style="background-color: rgb(${averageRGB}); width: 30px; height: 30px;"></div>`;



    }

}


