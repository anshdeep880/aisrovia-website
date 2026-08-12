const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
try {
  dom.window.document.querySelector("/contact");
  console.log("No error!");
} catch (e) {
  console.log("Error:", e.message);
}
