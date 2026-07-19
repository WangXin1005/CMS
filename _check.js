const fs = require("fs");
let c = fs.readFileSync("D:/projects/nuxtProject/nuxt-test/app/components/RichTextEditor.vue", "utf8");

// Show all toolbar buttons
const toolbarStart = c.indexOf("toolbar");
const toolbarEnd = c.indexOf("editor-content", toolbarStart);
console.log(c.substring(toolbarStart, toolbarEnd));
