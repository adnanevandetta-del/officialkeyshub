const { chromium } = require('playwright'); const fs = require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://127.0.0.1:8765/index_film.html');await p.waitForFunction(()=>window.READY===true,null,{timeout:120000});
fs.writeFileSync('shots_meta.json', JSON.stringify(await p.evaluate(()=>window.SHOTS_META)));await b.close();})();
