
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

        facingMode: "environment" // or user
    },
}

console.log(VIDEO_CONSTRAINTS)

let videoStream = undefined;
async function camera_button() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {



        const videoStream = await navigator.mediaDevices.getUserMedia(VIDEO_CONSTRAINTS)
            .catch(function(error){
                console.log("Error: " + error);
                return ACCESS_DENIED;
            })
            .then(function(){
                console.log("Instead Do This")
                displayVideo();
            })



        return PASS;
    }

}

async function displayVideo(){
    const video = document.querySelector('#camera_video')

    // Video Stream
    videoStream = await navigator.mediaDevices.getUserMedia(VIDEO_CONSTRAINTS)
    video.srcObject = videoStream
}

// Does Not Remain On Environment
async function swap_camera(){
    videoStream.getTracks().forEach((track) => {
        track.stop()
    })

    let currFace = VIDEO_CONSTRAINTS.video.facingMode;
    if(currFace === "user"){
        console.log("Switching To Rear . . .");
        VIDEO_CONSTRAINTS.video.facingMode = "environment";
        console.log(VIDEO_CONSTRAINTS.video.facingMode)
    }else if(currFace === "environment"){
        console.log("Switching To Front . . .");
        VIDEO_CONSTRAINTS.video.facingMode = "user";
    }

    await displayVideo()


}
