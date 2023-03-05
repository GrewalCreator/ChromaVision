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
            .catch(function (error) {
                console.log("Error: " + error);
                alert("Camera API Is Not Available")
                document.getElementById("activate_camera_button").remove()
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
    img.src = canvas.toDataURL("image/png");
    document.getElementById('activate_camera_button').remove();
    document.getElementById('camera_video').remove();
    document.getElementById('screenshot').remove();

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
    const TOLERANCE = 5;
    if(img.src !== ''){
        let context = canvas.getContext("2d");
        let X = event.x - Math.floor(TOLERANCE/2);
        let Y = event.y - Math.floor(TOLERANCE/2);

        let RGB_arr = []

        for(let i = 0; i < TOLERANCE; ++i){
            ++Y;
            X = X - (TOLERANCE - 1);
            for(let j = 0; j < TOLERANCE; ++j){
                let RGB = context.getImageData(X, Y, 1, 1);
                RGB_arr.push(RGB)
                ++X;
            }
        }
        /* let rezzy = getAverageRGB(RGB_arr)
         fetch(rezzy.toString())
             .then(response => response.json())
             .then(data => console.log(data.))
         console.log(rezzy)*/

    }

}


