const fs = require('fs-extra');
const path = require('path');

const baseDir = '../src/icons/iconfont';
const out = '../android/app/src/main/assets/fonts';
const dir = path.resolve(__dirname, baseDir, 'iconfont.svg');
const ttf = path.resolve(__dirname, baseDir, 'iconfont.ttf');

fs.pathExists(ttf, err => {
  if(err) {
    throw err;
  };
});

fs.readFile(dir, 'utf8', (err, data) => {
  if(err) {
    throw err;
  } else {
    let out = {};
    let splitData = data.match(/(<glyph)((?!glyph\s).)*(\/>)/g);
    splitData.length && splitData.map(item => {
      out[`icon-${item.match(/(?<=glyph-name=")((?!").)*(?=")/g)[0]}`] = +item.match(/(?<=unicode="&#)((?!").)*(?=;")/g)[0];
    });
    // console.log(out);
    fs.writeJson(path.resolve(__dirname, baseDir, 'iconfont_unicode.json'), out);
  }
  fs.copy(ttf, path.resolve(__dirname, out, 'iconfont.ttf'));
});
