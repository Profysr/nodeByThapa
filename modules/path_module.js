// path module
const path = require("path");

// it only works in commonjs
console.log(__dirname);
console.log(__filename);

// important topics

const filePath = path.join(__dirname, "data", "data.txt");

console.log(filePath);
console.log(path.parse(filePath));
