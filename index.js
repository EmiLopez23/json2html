import json2html from "node-json2html";
import http from "http";
import fs from "fs";
import data from "./data.json" assert { type: "json" };
const template = {
  "<>": "div",
  html: [
    { "<>": "h1", html: "${name}" },
    { "<>": "p", html: "${text}" },
  ],
};

const handleRequest = (request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  response.write(json2html.render(data, template));
  response.end();
};

http.createServer(handleRequest).listen(8000);
