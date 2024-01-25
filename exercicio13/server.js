require('dotenv').config();
const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const corsOption = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;


//connect to MONGODB

connectDB();

app.use(logger);

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware for cookies cookieParser
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));


app.get('/*', (request, response) => {
  response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


app.all('/*', (request, response) => {
  response.status(404);
  if (request.accepts('html')) {
    response.sendFile(path.join(__dirname, 'views', '404.html')); //302 by default 
  } else if (request.accepts('json')) {
    response.json({ error: "404 Not Found" }); //302 by default 
  } else {
    response.type('txt').send("404 Not Found");
  }
});

app.get('/*')

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('connected to mongo DB');
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

});


