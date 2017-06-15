const colors = require("colors");

var levels = {
  log: "[ LOG ]".magenta,
  info: "[INFO ]".green,
  warn: "[WARN ]".yellow,
  error: "[ERROR]".red
};

module.exports = function(babel) {
  const { types } = babel;

  function newDate() {
    return types.callExpression(
      types.memberExpression(
        types.newExpression(types.identifier("Date"), []),
        types.identifier("toISOString")
      ),
      []
    );
  }

  function level(callee) {
    const level = callee.property.name;
    return types.stringLiteral(levels[level]);
  }

  function fileLine(path) {
    const file = path.hub.file.parserOpts.sourceFileName;
    const line = path.node.loc.start.line;
    return types.stringLiteral(`[${file}:${line}]`);
  }

  return {
    name: "ast-transform", // not required
    visitor: {
      CallExpression(path) {
        const callee = path.node.callee;

        if (callee && callee.object && callee.object.name === "console") {
          path.node.arguments = [
            level(callee),
            newDate(),
            fileLine(path),
            ...path.node.arguments
          ];
        }
      }
    }
  };
};
