const fs = require ('fs');
const path = require ('path');

const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), {encoding: 'utf8'});

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'newLoremStreamFunction.txt'));



// rs.on('data', (dataChunk) => {
//   ws.write(dataChunk);
// })

//NOTE: other way 

rs.pipe(ws);