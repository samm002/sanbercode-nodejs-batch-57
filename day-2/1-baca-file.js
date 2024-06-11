const fs = require('fs');
const fileName = 'latihan-baca-file.txt';

fs.readFile(fileName, 'utf-8', (err, data) => {
  if (err) {
    console.error('error in reading file :', err);
  }

  console.log(`Isi file ${fileName} :`);
  console.log(data);
});