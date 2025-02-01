import readline from "readline";
import fs from "fs";
import path from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "* ",
});

const dir = process.cwd();
const createFile = (filename, content) => {
  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.log("Error creating file");
    } else {
      console.log("File created successfully");
    }
  });
};

const createFileUsingCLI = () => {
  rl.question("Enter file name:", (filename) => {
    const pathToFile = path.join(dir, `${filename}.txt`);
    rl.question("Enter file content:", (content) => {
      createFile(pathToFile, content);
      rl.close();
    });
  });
};

createFileUsingCLI();
