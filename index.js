var esprima = require('esprima');

var recast = require('recast');
var types = recast.types;
var n = recast.types.namedTypes;
var b = recast.types.builders;

var path = require('path');

function visitNode(node) {
  if (n.VariableDeclaration.check(node)) {
    this.replace(b.expressionStatement(b.literal('hi!')));
  }
}

function transform(ast) {
  return types.traverse(ast, visitNode);
}

module.exports = function transpile(source, type, opts) {
  var recastOptions = {
    esprima: esprima,
    tabWidth: 2,
    range: true,
    sourceFileName: path.basename(opts.registryName, '.js') + '.js',
    sourceMapName: path.basename(opts.registryName, '.js') + '.js.map'
  };

  var ast = recast.parse(source, recastOptions);

  var p = new types.NodePath(ast);
  var programPath = p.get("program");
  transform(programPath);

  return recast.print(p, recastOptions);
};
