const fs = require('fs-extra');
const path = require('path');

const baseDir = '../src/icons/iconfont';
const svgDir = path.resolve(__dirname, baseDir, 'iconfont.js');
fs.readFile(svgDir, 'utf8', (err, data) => {
  if(err) {
    throw err;
  } else {
    let out = {};
    let _data = data.replace(/.*(<svg>)/, '').replace(/(<\/svg>).*/, '');
    let splitData = _data.match(/(<symbol)((?!symbol).)*(<\/symbol>)/g);
    splitData.length && splitData.map(item => {
      out[item.match(/(?<=id=")((?!").)*(?=")/g)[0]] = item.replace(/(symbol)/g, 'svg');
    });
    fs.writeJson(path.resolve(__dirname, baseDir, 'iconfont_symbol.json'), out);
  }
});
