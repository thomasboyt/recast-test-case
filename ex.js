var compile = require('./index');
var fs = require('fs');

function compileToTmp(filename) {
  var in_ = fs.readFileSync(filename, 'utf8');

  var out = compile(in_, 'cjs', {
    registryName: filename,
    dirPath: 'app'
  });

  fs.writeFileSync(require('path').join('./tmp', filename), out.code);
  fs.writeFileSync(require('path').join('./tmp', filename + '.map'), JSON.stringify(out.map));
}

compileToTmp('./fixture.js');
