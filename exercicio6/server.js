const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

//NOTE: el ^ quiere decir que tiene que iniciar con '/'
// el $ quiere decir que tiene que terminar con '/'
// el | es un operador OR entonces le esta diciendo que tmb puede ser index.html
// el ()? esta haciendo que el '.html' sea opcional
app.get('^/$|index(.html)?', (request, response) => {
  // response.sendFile('./views/index.html', {root: __dirname});
  response.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (request, response) => {
  response.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (request, response) => {
  response.redirect(301, '/new-page.html'); //302 by default 
});

app.get('/*', (request, response) => {
  response.status(404).sendFile(path.join(__dirname, 'views', '404.html')); //302 by default 
});



app.get('/hello(.html)?', (request, response, next) => {
  console.log("That route does not exist");
  next();
}, (request, response) => {
  response.send("Hello World")
});

const one = (request, response, next) =>{
  console.log('one');
  next();
}

const two = (request, response, next) =>{
  console.log('two');
  next();
}

const tree = (request, response, next) =>{
  response.send("One - Two - Tree")
}

app.get('/chain.html', [one,two,tree]);

app.get('/*', (request, response) => {
  response.status(404).sendFile(path.join(__dirname, 'views', '404.html')); //302 by default 
});

app.get('/*')



app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)); 