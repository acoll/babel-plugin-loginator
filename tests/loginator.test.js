const fs = require("fs");
const path = require("path");
const babel = require("babel-core");
const loginator = require("../");

const files = fs.readdirSync(path.join(__dirname, "test-files"));

const babelOpts = {
  plugins: [loginator]
};

describe("File Tests", () => {
  files.forEach(file => {
    test(file, () => {
      const { code } = babel.transformFileSync(
        path.join(__dirname, "test-files", file),
        babelOpts
      );
      expect(code).toMatchSnapshot();
    });
  });
});
