const crypto = require("crypto");

const randomBytes = crypto.randomBytes(8).toString("hex");

// here sha256 is your algorithm, password is your data or you can say key and hex is you data representation type
const hashPassword = crypto
  .createHash("sha256")
  .update("password")
  .digest("hex");

console.log(randomBytes);
console.log(hashPassword);
