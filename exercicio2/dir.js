const fs = require('fs');

if(!fs.existsSync('./exercicio2/files/new')){
  fs.mkdir('./exercicio2/files/new', (err) => {
    if(err) throw err;
    console.log('Directory created')
  })
}

if(fs.existsSync('./exercicio2/files/new')){
  fs.rmdir('./exercicio2/files/new', (err) => {
    if(err) throw err;
    console.log('Directory deleted')
  })
}