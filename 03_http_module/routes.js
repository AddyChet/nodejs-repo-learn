const http = require("http")

const server = http.createServer((req, res) => {
    const url = req.url;
    if(url=== "/") {
        res.writeHead(200, {"Content-Type":"text/plain"});
        res.end("Home page")
        
    }else if(url === '/projects') {
        res.writeHead(200, {"Content-Type":"text/plain"});
        res.end("Projects page")
    } else {
        res.writeHead(400, {"Content-Type":"text/plain"});
        res.end("Page not found")
    }

    
})

const port = 8000
server.listen(port, ()=> {
    console.log("Server is now running at port " + port)
})