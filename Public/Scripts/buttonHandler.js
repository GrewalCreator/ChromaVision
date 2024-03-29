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


function textToSpeech(speech){
    if ('speechSynthesis' in window) {
        let msg = new SpeechSynthesisUtterance();
        msg.text = speech;
        window.speechSynthesis.speak(msg);
    }else{
        alert("Sorry, your browser doesn't support text to speech!");
    }
}
async function camera_button() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        await navigator.mediaDevices.getUserMedia(VIDEO_CONSTRAINTS)
            .catch(function (error) {
                console.log("Error: " + error);
                if(error === DOMException){
                    alert("Browser May Not Support Camera API")
                }else{
                    alert("Camera API Is Not Available")
                }
                return -1;
            })
            .then(function () {
                displayVideo();
            })

        document.getElementById("activate_camera_button").remove();
        document.getElementById('screenshot').style.display = "inline-block";


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
    video.style.transform = 'scaleX(-1)'
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
        await getColorNameFromHex(hexValue).then(() => {
            let textDiv = document.getElementById("color_info");

            textDiv.innerHTML = `<p class = "retrievedInfo">HexValue: ${hexValue}<\p>`;

            textDiv.innerHTML += `<p class = "retrievedInfo">RGBValue: ${averageRGB}<\p>`;

            textDiv.innerHTML += `<div class="outputcolor" style="background-color: rgb(${averageRGB}); width: 30px; height: 30px;"></div>`;
        });

        document.getElementById('colorInfo').style.borderWidth = '5px';







    }

}


