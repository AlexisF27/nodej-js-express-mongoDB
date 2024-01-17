const logEvents = require('./logEvents');
const http = require('http');
const path = require('path');
const fs = require ('fs');
const fsPromises = require ('fs').promises;
const EventEmmiter = require('events');

class Emmiter extends EventEmmiter {};


//initialize object
const myEmmiter = new Emmiter();
myEmmiter.on('log', (msg, filename) => logEvents(msg,filename));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, res) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,  
      !contentType.includes('image') ? 'UTF8' : ''
    );
    const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
    console.log("-----",filePath);
    res.writeHead(
      // filePath.includes('404.html') ? 404 : 200, 
      filePath.includes('404.html') ? 404 : 200, 
      {'Content-Type': contentType}
    );
    //console.log("here----------------------------------------------------------------------- here",res,filePath.includes('404.html') );
    res.end(
      contentType === 'application/json' ? JSON.stringify(data): data
    );
  } catch (error) {
    console.log(error);
    myEmmiter.emit('log', `${error.name} : ${error.message}`, 'errLog.txt');
    res.statusCode = 500;
    res.end();

  }
}



const server = http.createServer((request,response) => {
    try {
      console.log(request.url, request.method);

    myEmmiter.emit('log', `${request.url}\t ${ request.method}`, 'reqLog.txt');

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
            contentType = 'image/jpeg';
            break;
          case '.png':
            contentType = 'image/png';
            break;
          case '.txt':
            contentType = 'text/plain';
            break;
          default:
            contentType = 'text/html';
        }

    
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
          console.log(path.parse(filePath).base, response.statusCode);
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
              // console.log(path.join(__dirname, 'views', '404.html').includes('404.html'), path.join(__dirname, 'views', '404.html'));

          }
        }
    
    } catch (error) {
      console.log(error);
    }
  })

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)); 