const http = require("node:http");
const EventEmitter = require("node:events");
const fs = require("node:fs");
const path = require("node:path");

const indexPath = path.resolve("index.html");
const aboutPath = path.resolve("about.html");
const contactPath = path.resolve("contact-me.html");
const errorPath = path.resolve("404.html");

const eventEmitter = new EventEmitter();

http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();

        response.on("error", (err) => {
          console.error(err);
        });

        switch (url) {
          case "/":
            response.writeHead(200, { "content-type": "text/html" });
            fs.readFile(indexPath, "utf8", (err, data) => {
              if (err) {
                console.log(err);
                return;
              }

              response.end(data);
            });

            break;

          case "/about":
            response.writeHead(200, { "content-type": "text/html" });
            fs.readFile(aboutPath, "utf8", (err, data) => {
              if (err) {
                console.log(err);
                return;
              }
              response.end(data);
            });
            break;

          case "/contact-me":
            fs.readFile(contactPath, "utf8", (err, data) => {
              if (err) {
                console.log(err);
                return;
              }
              response.end(data);
            });
            break;
          default:
            fs.readFile(errorPath, "utf8", (err, data) => {
              response.writeHead(404, { "content-type": "text/html" });
              if (err) {
                console.log(err);
                return;
              }
              response.end(data);
              return;
            });
        }
      });
  })
  .listen(8080);
