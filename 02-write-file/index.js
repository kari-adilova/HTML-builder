const fs = require('fs');
const path = require('path');
const readLine = require('readline');


const { 
  stdin: input, 
  stdout: output
} = require('process');

const filePath = path.join(__dirname, 'output.txt');

let outputStream = fs.createWriteStream(filePath, 'utf-8');

const rl = readLine.createInterface({input, output});

rl.setPrompt('Write something: ');
rl.prompt();

rl.on('line', (data) => {
  if (data === 'exit') {
    output.write('Thank you!');
    process.exit();
  }
  outputStream.write(data + '\n');
  rl.setPrompt('Write something else: ');
  rl.prompt();
});


rl.on('SIGINT', () => {
  output.write('\nThank you!');
  process.exit();
});
