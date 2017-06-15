const colors = require("colors");

var levels = {
  log: "[ LOG ]",
  info: "[INFO ]",
  warn: "[WARN ]",
  error: "[ERROR]"
};

var coloredLevels = {
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

  function level(callee, opts) {
    const level = callee.property.name;
    return types.stringLiteral(
      opts.colors ? coloredLevels[level] : levels[level]
    );
  }

  function fileLine(path) {
    const file = path.hub.file.parserOpts.sourceFileName.replace(
      process.cwd(),
      ""
    );
    const line = path.node.loc.start.line;
    return types.stringLiteral(`[${file}:${line}]`);
  }

  return {
    name: "loginator", // not required
    visitor: {
      CallExpression(path, state) {
        const callee = path.node.callee;

        if (callee && callee.object && callee.object.name === "console") {
          path.node.arguments = [
            level(callee, state.opts),
            newDate(),
            fileLine(path),
            ...path.node.arguments
          ];
        }
      }
    }
  };
};
