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

        return 0;
    }
}

async function screenshot(){
    video.pause();
    const img = document.createElement("img");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png");
    document.getElementById('camera_video').remove();

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
    /*console.log("x,y: " +  event.x + "," + event.y)

    let rasterImg = new Raster('test');

    let canvas = document.getElementById("canvas")



    rasterImg.position = view.center;

    rasterImg.on('load', function(){
        rasterImg.size = new Size(80, 60);
    })

    let color = rasterImg.getPixel(event.x, event.y);
    rasterImg.getAverageColor();


    console.log(color)*/
}