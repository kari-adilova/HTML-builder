const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');

const secretFolderDir = path.join(__dirname, 'secret-folder');

async function getFiles() {
  const files = await fsPromises.readdir(secretFolderDir, { withFileTypes: true});
  files.forEach(file => {
    if (file.isFile()) {
      const filePath = path.join(secretFolderDir, file.name);
      const fileInfo = path.parse(filePath);
      const fileStat = fs.stat(filePath, (err, stats) => {
        console.log(fileInfo.name, ' - ', fileInfo.ext, ' - ', stats.size / 1024 + 'kb');
      });
    }
  })
}

getFiles();

