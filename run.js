var fs = require("fs");
var babel = require("babel-core");
var doshit = require("./doshit");

// read the filename from the command line arguments
var fileName = process.argv[2];

const result = babel.transformFileSync(fileName, {
  plugins: [doshit]
});

console.log("-----------------------------------------------");
console.log(result.code);
