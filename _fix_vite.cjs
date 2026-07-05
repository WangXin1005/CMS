const fs = require('fs');
const p = 'D:/projects/nuxtProject/nuxt-test/nuxt.config.ts';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(
  'vite: {\n    server: {',
  'vite: {\n    optimizeDeps: {\n      include: [\n        \'dayjs\',\n        \'dayjs/plugin/*.js\',\n        \'lodash-unified\',\n        \'sortablejs\',\n      ],\n    },\n    server: {'
);
fs.writeFileSync(p, c, 'utf8');
console.log('done');
