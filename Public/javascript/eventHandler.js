document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('activate_camera_button').addEventListener('click', camera_button)
    document.addEventListener('click', getPixelColor)
    document.getElementById('get_using_hex').addEventListener('click', getColorNameFromHex)
    document.getElementById('screenshot').addEventListener('click', screenshot)
    document.getElementById('reset').addEventListener('click', reset)
    if(( window.innerWidth <= 1920 ) && ( window.innerHeight <= 1080 )){
        document.getElementById('activate_camera_button').addEventListener('click', handleVideo)
    }
    else{
        document.getElementById('picture_received').addEventListener('change',handlePicture)
    }
})
