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

let videoStream = undefined;
async function camera_button() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        await navigator.mediaDevices.getUserMedia(VIDEO_CONSTRAINTS)
            .catch(function(error){
                console.log("Error: " + error);
                return -1;
            })
            .then(function(){
                console.log("Instead Do This")
                displayVideo();
            })

        return 0;
    }
}

async function handleVideo(){
    let canvas = document.getElementById('image-manip');
    let context = canvas.getContext('2d');
    let video = document.querySelector('video')
    canvas.width = video.width
    canvas.height = video.height
    console.dir(video)
    console.log(canvas.width, " ", canvas.height)
    context.drawImage(video,0,0,canvas.width, canvas.height)
    let image = canvas.toDataURL('image/jpeg')
    console.log('handlevideo called, image is ', image)
}
function screenshot() {
    console.log("real")
    let canvas = document.getElementById('image-manip');
    let context = canvas.getContext('2d');
    let video = document.querySelector("video")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context
        .drawImage(video,0,0,video.width,video.height)
}
 async function handlePicture(e){
    imgDiv.innerHTML += "handler function did its job"
    let canvas = document.getElementById('image-manip');
    let context = canvas.getContext('2d');
    var filereader = new FileReader();
    filereader.onload = function(event){
        var img = new Image();
        img.onload = function (){
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    filereader.readAsDataURL(e.target.files[0]);
 }
async function displayVideo(){
    const video = document.querySelector('#camera_video')

    // Video Stream
    videoStream = await navigator.mediaDevices.getUserMedia(VIDEO_CONSTRAINTS)
    video.srcObject = videoStream
}


async function getPixelColor(event){
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



