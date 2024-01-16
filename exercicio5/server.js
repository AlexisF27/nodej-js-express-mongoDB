const logEvents = require('./logEvents');
const http = require('http');
const path = require('path');
const fs = require ('fs');
const fsPromises = require ('fs').promises;
const EventEmmiter = require('events');

class Emmiter extends EventEmmiter {};


//initialize object
const myEmmiter = new Emmiter();


const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, res) => {
  try {
    const data = await fsPromises.readFile(filePath,  'utf8');
    res.writeHead(200, {'Content-Type': contentType});
    res.end(data);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.end();

  }
}



const server = http.createServer((request,response) => {
    try {
      console.log(request.url, request.method);

      let filePath;
      //NOTE: esta es la forma de hacer una llamada y devolver un cierto contenido con sus especificiaciones
          //como el Header y la direccion al dicho recurso 
    
      // if (request.url === '/' || request.url === 'index.html'){
      //   request.statusCode = 200;
      //   response.setHeader('Content-type', 'text/html');
      //   filePath = path.join(__dirname, 'views', 'index.html');
      //   fs.readFile(filePath, 'utf8',(error, data) => {
      //     try {
      //       response.end(data);
            
      //     } catch (err) {
      //       console.error(error);
      //     }
      //   })
      // }
    
        let extension = path.extname(request.url);
        let contentType;
    
        switch (extension) {
          case '.css':
            contentType = 'text/css';
            break;
          case '.js':
            contentType = 'text/javascript';
            break;
          case '.json':
            contentType = 'text/json';
            break;
          case '.jpg':
            contentType = 'text/jpeg';
            break;
          case '.png':
            contentType = 'text/png';
            break;
          case '.txt':
            contentType = 'text/plain';
            break;
          default:
            contentType = 'text/html';
        }
        console.log(contentType);
    
        filePath = contentType === 'text/html' && request.url === '/'
                      ? path.join(__dirname, 'views', 'index.html')
                      : contentType === 'text/html' && request.url.slice(-1) === '/'
                          ? path.join(__dirname, 'views', request.url, 'index.html')
                          : contentType === 'text/html'
                              ? path.join(__dirname, 'views', request.url)
                              : path.join(__dirname, request.url);
    
        //NOTE: makes .html extions not required in the browser
        if(!extension && request.url.slice(-1) !== '/') filePath += '.html';
    
    
        const fileExists = fs.existsSync(filePath);
    
        if(fileExists){
          //serve the file
          console.log(filePath);
          serveFile(filePath, contentType, response);
        }else{
          // 404
          // 301 redirect
          switch(path.parse(filePath).base){
            case 'old-page.html':
              response.writeHead(301, {'Location': '/new-page.html'});
              response.end();
              break;
            case 'www-page.html':
              response.writeHead(301, {'Location': '/'});
              response.end();
              break;
            default:
              //serve 404 response 
              serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', response);
          }
        }
    
    } catch (error) {
      console.log(error);
    }
  })

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)); 


// add listener for the log event

// myEmmiter.on('log', (msg) => logEvents(msg));

// setTimeout(() => {
//   //Emit event
//   myEmmiter.emit('log', 'Log event emmiter');
// },2000)