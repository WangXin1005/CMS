const fs = require("fs");
const path = require("path");
const dir = "D:/projects/nuxtProject/nuxt-test/app/pages";

function scanDir(d) {
  const items = fs.readdirSync(d, { withFileTypes: true });
  for (const item of items) {
    const p = path.join(d, item.name);
    if (item.isDirectory()) { scanDir(p); }
    else if (item.name.endsWith(".vue")) {
      const c = fs.readFileSync(p, "utf8");
      const lines = c.split("\n");
      const decls = {};
      let hasDup = false;
      lines.forEach((l, i) => {
        const m = l.match(/const (\w+) = (ref|computed|reactive)\(/);
        if (m) {
          if (decls[m[1]] && !hasDup) {
            console.log("DUPLICATE in " + p.replace(dir + "/", "") + ": " + m[1] + " at lines " + decls[m[1]] + " and " + (i+1));
            hasDup = true;
          }
          decls[m[1]] = i+1;
        }
      });
    }
  }
}
scanDir(dir);
console.log("Scan complete");