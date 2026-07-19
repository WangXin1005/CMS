const fs = require("fs");
let c = fs.readFileSync("D:/projects/nuxtProject/nuxt-test/app/components/RichTextEditor.vue", "utf8");

// 在分隔线按钮后、撤销按钮组前插入表格按钮
const hrButton = 'content="分隔线" placement="top">\n          <el-button @click="editor.chain().focus().setHorizontalRule().run()">—</el-button>\n        </el-tooltip>';

const tableButton = '\n        <el-tooltip content="插入表格" placement="top">\n          <el-button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">表格</el-button>\n        </el-tooltip>';

if (c.includes(hrButton)) {
  c = c.replace(hrButton, hrButton + tableButton);
  console.log("table button added");
} else {
  console.log("hrButton not found, searching...");
  const idx = c.indexOf("setHorizontalRule");
  console.log(c.substring(idx-60, idx+60));
}

fs.writeFileSync("D:/projects/nuxtProject/nuxt-test/app/components/RichTextEditor.vue", c);
console.log("done");
