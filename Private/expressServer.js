const express = require('express')
const logger = require('morgan')
const fs = require("fs");
const app = express()

const PORT = process.env.PORT || 3000
const ROOT_DIR = '/../Public'

app.use(logger('common', {
    stream: fs.createWriteStream('./serverLogs.log', {flags: 'a'})
}));

app.use( logger('dev'))

app.use(function(req, res, next){
    let currPath = ROOT_DIR
    if(req.path.includes(".js")){
        currPath += "/Scripts"
    }else if(req.path.includes(".css") || req.path.includes(".html")){
        currPath += "/Views"
    }
    else{
        currPath += "/Views/images"
    }

    console.log('-------------------------------')
    console.log('req.path: ', req.path)
    console.log('serving:' + __dirname + currPath + req.path)
    next();
})
app.use(express.static(__dirname + ROOT_DIR))

app.use((req,res)=>{
    res.status(404).send("404: Cannot Find What You're Looking For")
})
app.listen(PORT, err => {
    if (err) console.log(err)
    else {
        console.log(`Server listening on port: ${PORT}`)
        console.log('http://localhost:3000/index.html')

    }
})