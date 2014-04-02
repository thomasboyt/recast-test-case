var esprima = require('esprima');

var recast = require('recast');

var types = recast.types;
var n = recast.types.namedTypes;
var b = recast.types.builders;

function visitNode(node) {
  if (n.VariableDeclaration.check(node)) {
    this.replace(b.expressionStatement(b.literal('hi!')));
  }
}

function transform(ast) {
  return types.traverse(ast, visitNode);
}

module.exports = function transpile(source, filename) {
  var recastOptions = {
    esprima: esprima,
    tabWidth: 2,
    range: true,
    sourceFileName: filename,
    sourceMapName: filename + '.map'
  };

  var ast = recast.parse(source, recastOptions);

  var path = new types.NodePath(ast);
  var programPath = path.get("program");
  transform(programPath);

  return recast.print(path, recastOptions);
};
