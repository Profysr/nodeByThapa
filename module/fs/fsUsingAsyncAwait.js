const fs = require("fs");
const path = require("path");

const filename = "asyncAwait.txt";
const dirname = __dirname;
const anOtherway = path.resolve();
const Otherway = process.cwd();

// getting directory files
// fs.promises
//   .readdir(dirname)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.error(err));

// (async () => {
//   try {
//     const res = await fs.promises.readdir(dirname);
//     for (const file of res) {
//       const res = await fs.promises.readFile(path.join(dirname, file), "utf-8");
//       console.log(`response of ${file} is: ${res}`);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// })();

// Writing File

// (async () => {
//   try {
//     const res = await fs.promises.writeFile(
//       path.join(dirname, filename),
//       "Handling Things Using Async Await",
//       "utf-8"
//     );
//     console.log("File Created Successfully");
//   } catch (error) {
//     console.log(error);
//   }
// })();

fs.promises
  .writeFile(
    path.join(dirname, filename),
    "Handling Things Using Promises",
    "utf-8"
  )
  .then(() => {
    console.log("File Created Successfully");
  })
  .catch((err) => console.error(err));
