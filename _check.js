const fs = require("fs");
const c = fs.readFileSync("D:/projects/nuxtProject/nuxt-test/app/pages/index.vue", "utf8");
console.log("=== 完整 Script ===");
const s = c.indexOf("<script");
const e = c.indexOf("</script>", s);
console.log(c.substring(s, e + 9));
