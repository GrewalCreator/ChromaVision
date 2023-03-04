document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('activate_camera_button').addEventListener('click', camera_button)
    document.getElementById('switch_camera').addEventListener('click', swap_camera)
    document.addEventListener('click', getPixelColor)

    document.getElementById('get_using_hex').addEventListener('click', getColorNameFromHex)
})
