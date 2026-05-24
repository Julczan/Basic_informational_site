const path = require("node:path");
const fs = require("node:fs");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const options = {
    root: __dirname,
  };

  res.sendFile("index.html", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent the index page");
    }
  });
});

app.get("/:name", (req, res) => {
  const options = {
    root: __dirname,
  };
  const filename = req.params.name + ".html";
  res.sendFile(filename, options, (err) => {
    if (err) {
      res.sendFile("404.html", options, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Sent the error page");
        }
      });
    } else {
      console.log("Sent: " + filename);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
