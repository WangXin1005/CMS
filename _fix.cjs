const fs = require("fs");
const f = "D:/projects/nuxtProject/nuxt-test/app/pages/home.vue";
let c = fs.readFileSync(f, "utf8");
// Remove the duplicate isGuest declaration (second occurrence)
const idx = c.indexOf("const isGuest = computed(() => role.value === 'GUEST')");
const idx2 = c.indexOf("const isGuest = computed(() => role.value === 'GUEST')", idx + 1);
if (idx2 > 0) {
  let end = c.indexOf("\n", idx2);
  c = c.substring(0, idx2) + c.substring(end + 1);
  fs.writeFileSync(f, c, "utf8");
  console.log("Removed duplicate isGuest");
}