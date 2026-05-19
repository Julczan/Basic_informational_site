const http = require("node:http");
const EventEmitter = require("node:events");
const fs = require("node:fs");
const path = require("node:path");

const indexPath = path.resolve("index.html");

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

        response.writeHead(200, { "Content-Type": "text/html" });

        fs.readFile(indexPath, "utf8", (err, data) => {
          if (err) {
            console.log(err);
            return;
          }

          response.end(data);
        });
      });
  })
  .listen(8080);
