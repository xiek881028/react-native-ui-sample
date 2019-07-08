// window = {};
// document = {};
// document.getElementsByTagName = () => {
//   return {};
// };
const fs = require('fs-extra');
const path = require('path');

const svgDir = path.resolve(__dirname, '../src/icons/iconfont/iconfont.js');
// let svg = require('../src/icons/iconfont/iconfont.js');
fs.readFile(svgDir, 'utf8', (err, data) => {
  if(err) {
    throw err;
  } else {
    let out = {};
    let _data = data.replace(/.*(<svg>)/, '').replace(/(<\/svg>).*/, '');
    let splitData = _data.match(/(<symbol)((?!symbol).)*(<\/symbol>)/g);
    splitData.map(item => {
      out[item.match(/(?<=id=")((?!").)*(?=")/g)[0]] = item;
    });
    fs.writeJson(path.resolve(__dirname, '../src/icons/iconfont/iconfont.json'), out);
  }
});
