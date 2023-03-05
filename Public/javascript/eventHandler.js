document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('activate_camera_button').addEventListener('click', camera_button)
    //document.addEventListener('click', getPixelColor)
    document.getElementById('screenshot').addEventListener('click', screenshot)
    document.getElementById('reset').addEventListener('click', reset)
    document.getElementById('canvas').addEventListener('click', getPixelColor)

})
