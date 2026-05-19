const http = require("node:http");
const EventEmitter = require("node:events");
const eventEmitter = new EventEmitter();

const server = http
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

        if (url === "/hello") {
          response.end(
            "<html><body><h1>It feels good to be back</h1></body></html>",
          );
          return;
        }
        response.end("<html><body><h1>Hello, World!</h1></body></html>");
      });
  })
  .listen(8080);
