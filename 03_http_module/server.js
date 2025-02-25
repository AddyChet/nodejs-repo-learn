const http = require("http")

const server = http.createServer((req, res) => {
    console.log(req)

    // writeHead ( status code, statusMessage, Headers--> obj/arrays)
    res.writeHead(200, {'Content-Type' : "text/plain"})
    res.end("hello from node js")
})

server.listen(3000 ,()=>{
    console.log("server is now listening to port 8000")
})