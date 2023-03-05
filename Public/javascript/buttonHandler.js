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
    var rect = canvas.getBoundingClientRect();
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png")
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    canvas.getContext()
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
    const TOLERANCE = 1;
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
        var rezzy = [];
        rezzy = await getAverageRGB(RGB_arr);
        console.log("rezzy: " + rezzy);
        console.log("rezzy[0]" + rezzy[0]);

        console.log(getColorNameFromHex((rezzy[0].toString(16)) + (rezzy[1].toString(16)) + (rezzy[2].toString(16))));

    }

}


