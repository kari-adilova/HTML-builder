const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const newFolderPath = path.join(__dirname, 'files-copy');

if (fs.access(newFolderPath, errAccess => {
  if (errAccess) {
    fsPromises.mkdir(newFolderPath, { recursive: true });
    copyFiles();
  } else {
    deleteFiles().then(() => {
      fsPromises.mkdir(newFolderPath, { recursive: true }).then(()=> {
        copyFiles();
      });
    });
  }
}));

async function deleteFiles() {
  const files = await fsPromises.readdir(path.join(__dirname, 'files-copy'));
  files.forEach((file) => {
    const filePath = path.join(__dirname, 'files-copy', file);
    fsPromises.rm(filePath);
  });
}

async function copyFiles() {
  const files = await fsPromises.readdir(path.join(__dirname, 'files'));
  files.forEach((file) => {
    const filePath = path.join(__dirname, 'files', file);
    const newFilePath = path.join(newFolderPath, file);
    fsPromises.copyFile(filePath, newFilePath);
  });
}
