const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    //set header content type
    res.setHeader("Content-type", "text/html");

    let path = "./views/";
    switch (req.url) {
        case ("/"):
            path+= "index.html";
            res.statusCode = 200;
            break;
        case ("/about"):
             path+= "about.html";
             res.statusCode = 200;
             break;
        case ("/about-us "):
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            res.end();
            break;
        default:
             path+= "404.html";
             res.statusCode = 400;
             break;
    }

    fs.readFile(path, (error, data) => {
        if(error) {
            console.log("Error reading file: " + error);
            res.end();
        } else{
            res.write(data);
            res.end(); 
        }
    });
}); 

server.listen(3000, () => {
    console.log("Listening for requests");
});