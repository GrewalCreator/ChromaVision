const http = require('http') //need to http
const fs = require('fs') //need to read static files
const url = require('url') //to parse url strings



const ROOT_DIR = 'html' //dir to serve static files from

const MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'txt': 'text/plain'
}
function get_mime(filename) {
    for (let ext in MIME_TYPES) {
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return MIME_TYPES[ext]
        }
    }
    return MIME_TYPES['txt']
}

http.createServer(function(request, response) {
    let urlObj = url.parse(request.url, true, false)
    console.log('\n============================')
    console.log("PATHNAME: " + urlObj.pathname)
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
    console.log("METHOD: " + request.method)

    let receivedData = ''

    //attached event handlers to collect the message data
    request.on('data', function(chunk) {
        receivedData += chunk
    })

    let dataObj = undefined //object representing the client data
    let returnObj = {} //object to be returned to client


    request.on('end', function() {
        console.log('received data: ', receivedData)
        console.log('type: ', typeof receivedData)

        if (request.method === "POST") {
            dataObj = JSON.parse(receivedData)
            console.log("received data object: ", dataObj)
            console.log("type: ", typeof dataObj)
            console.log("USER REQUEST: " + dataObj.link)
            returnObj.text = "NOT FOUND: " + dataObj.link
        }


        if (request.method === "GET") {
            let filePath = ROOT_DIR + urlObj.pathname
            if (urlObj.pathname === '/') filePath = ROOT_DIR + '/testIndex.html'

            fs.readFile(filePath, function(err, data) {
                if (err) {
                    console.log('ERROR: ' + JSON.stringify(err))
                    response.writeHead(404)
                    response.end(JSON.stringify(err))
                    return
                }
                response.writeHead(200, {
                    'Content-Type': get_mime(filePath)
                })
                response.end(data)
            })
        }

        if(request.method === "POST" && urlObj.pathname === "/getColor"){
            let colorName = undefined
            fetch(dataObj.link, {
                method: 'GET',
                headers: {'Content-Type': 'application/json',}

            })
            // Step 3: retrieve json object and turn it into a string
            .then(response => response.json())
            .then((res) => {
                colorName = res.name.value.toString()
                returnObj.text = colorName

                response.writeHead(200, {
                    "Content-Type": MIME_TYPES["json"]
                })

                response.end(JSON.stringify(returnObj))
            })
            .catch(error => {
                console.log("Error From GET in Server For Color API: " + error)
            })

        }
    })
}).listen(3000)

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit')
console.log('To Test')
console.log('http://localhost:3000/testIndex.html')
