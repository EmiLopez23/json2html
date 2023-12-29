import json2html from "node-json2html";
import http from "http";
import data from "./data.json" assert { type: "json" };
import puppeteer from "puppeteer";
const template = {
  "<>": "div",
  html: [
    { "<>": "h1", html: "${name}", style: "color: blue" },
    { "<>": "p", html: "${text}" },
    { "<>": "img", src: "${img}", style: "width: 500px" },
  ],
  style:
    "display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; background-color: #f5f5f5;",
};

const handleRequest = (request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  response.write(json2html.render(data, template));
  response.end();
};


async function generatePDFfromHTML(htmlContent, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath, format: 'A4' });
    await browser.close();
  }

generatePDFfromHTML(json2html.render(data, template), './test.pdf');

http.createServer(handleRequest).listen(8000);
