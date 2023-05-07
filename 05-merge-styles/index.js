const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const stylePath = path.join(__dirname, 'styles');

const writeableStream  = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fsPromises.readdir(stylePath, { withFileTypes: true}).then((styleFiles) => {
  styleFiles.forEach((file) => {
    const fileInfo = path.parse(path.join(stylePath, file.name));
    if (file.isFile() && fileInfo.ext === '.css') {
      const readableStream = fs.createReadStream(path.join(stylePath, file.name), 'utf-8');
      readableStream.on('data', (chunk) => {
        writeableStream.write(chunk);
      });
    } 
  });
});