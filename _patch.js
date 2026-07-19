const fs = require("fs");
const p = "D:/projects/nuxtProject/nuxt-test/app/pages/article/[slug].vue";
let c = fs.readFileSync(p, "utf8");

// Find the first occurrence of class="back-bar" in template (search from where template starts)
const templateStart = c.indexOf("<template>");
const backBarIdx = c.indexOf('class="back-bar"', templateStart);
console.log("backBarIdx from template:", backBarIdx);

// The outer div containing back-bar starts 6 chars before 'class="back-bar"'
// i.e. '      <div class="back-bar">'
const blockStart = backBarIdx - 6; // points to '      <div class="back-bar">'

// Find the end of article-header: the </div> that's right before <!-- 封面图 -->
const coverCommentIdx = c.indexOf("<!-- 封面图 -->", blockStart);
console.log("coverCommentIdx:", coverCommentIdx);

// Find the </div> right before <!-- 封面图 -->
const beforeCover = c.substring(0, coverCommentIdx);
const lastDivBeforeCover = beforeCover.lastIndexOf("</div>");
console.log("lastDivBeforeCover:", lastDivBeforeCover);

// The block to wrap starts at blockStart and ends after the </div> closing article-header
// We need to include the </div>\r\n\r\n      before the comment
const blockEnd = coverCommentIdx; // right at <!-- 封面图 -->

const block = c.substring(blockStart, blockEnd);
console.log("Block to wrap:");
console.log(block);

// Replace with wrapped version
const wrapped = '      <div class="sticky-header">\r\n' + block + '\r\n      </div>\r\n\r\n      ';
c = c.substring(0, blockStart) + wrapped + c.substring(blockEnd);

fs.writeFileSync(p, c);
console.log("done");
