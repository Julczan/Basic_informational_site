const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const errorPath = path.resolve("404.html");

function getFile(url) {
  if (url === "/") {
    return path.join(process.cwd() + "/index.html");
  }
  if (url === "/about") {
    return path.join(process.cwd() + "/about.html");
  }
  if (url === "/contact-me") {
    return path.join(process.cwd() + "/contact-me.html");
  }
}

const page404 = fs.readFileSync(errorPath, "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  return data;
});

http
  .createServer((request, response) => {
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

        let pathname = "";

        pathname += getFile(request.url);

        if (!pathname) {
          response.writeHead(400, { "content-type": "text/html" });
          response.end(page404);
          return;
        }

        fs.readFile(pathname, "utf8", (err, data) => {
          if (err) {
            response.writeHead(400, { "content-type": "text/html" });
            response.end(page404);
            console.log(err);

            return;
          }
          response.writeHead(200, { "content-type": "text/html" });
          response.end(data);
        });
      });
  })
  .listen(8080);
