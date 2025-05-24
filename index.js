const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    let filepath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    let ext = path.extname(filepath);

    const extTypes = {
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
    };

    let contentType = extTypes[ext] || "text/html";


    fs.readFile(filepath, (err, content) => {
        if(err) {
            if(err.code== "ENOENT") {
                fs.readFile("./404.html", (err, content) => {
                    res.writeHead(404, {"Content-Type": "text/html"});
                    res.end(content);
                });
            }
            else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else {
            res.writeHead(200, {"Content-Type" : contentType});
            res.end(content);
        }
    });
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));