// fs system is a module that allows you to work with file system such performing CRUD operations on files

const fs = require("fs");
const path = require("path");

const filename = "file.txt";
const dirname = __dirname;
const anOtherway = path.resolve();
const Otherway = process.cwd();

const filePath = path.join(dirname, filename);

// create
const createFile = fs.writeFile(filePath, "Hello World", "utf-8", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Create-File created successfully");
});

// read
const readFile = fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) console.error(err);
  else console.log("Read-", data);
});

// update
const updateFile = fs.appendFile(
  filePath,
  "\nUpdated World",
  "utf-8",
  (err) => {
    if (err) console.error(err);
    else console.log("Update-File updated successfully");
  }
);

const newFilePath = path.join(dirname, "newFile.txt");

// rename
const renameFile = fs.rename(filePath, newFilePath, (err) => {
  if (err) console.error(err);
  else console.log("Rename-File renamed successfully");
});

// delete
const deleteFile = fs.unlink(newFilePath, (err) => {
  if (err) console.error(err);
  else console.log("Delete-File deleted successfully");
});
