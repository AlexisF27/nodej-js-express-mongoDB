const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const PORT = process.env.PORT || 3500;

app.use(logger);

const whiteList = ['https://www.yoursite.com', 'http://localhost:3500'];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    } else {
      callback(new Error(' not allowed by CORS'))
    }
  }, 
  optionSuccessSTatus:200
}
app.use(cors(corsOption));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));


app.get('/*', (request, response) => {
  response.status(404).sendFile(path.join(__dirname, 'views', '404.html')); 
});


app.all('/*', (request, response) => {
  response.status(404);
  if(request.accepts('html')){
    response.sendFile(path.join(__dirname, 'views', '404.html')); //302 by default 
  }else if(request.accepts('json')){
    response.json({ error: "404 Not Found"}); //302 by default 
  }else {
    response.type('txt').send("404 Not Found");
  }
});

app.get('/*')

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)); 

