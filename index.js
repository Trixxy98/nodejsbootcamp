const fs = require('fs');
const http = require('http'); //import http module
const url = require('url'); //import url module

////////////////////////////////////
////FILES
// Blocking, synchronous way
/*const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
const textOut = `Ini adalah apa yang kita ketahui tentang avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./starter/txt/output.txt', textOut);
console.log('File dah ditulis!');
*/
// Non-blocking, asynchronous way
/*fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data) => {
  console.log(data);
});
console.log('Will read file!');*/

//callback hell
/*fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => { 
    if (err) return console.log('ERROR! 💥'); //baca file start.txt
  fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => { //baca file read-this.txt sbb data1 isi start.txt
    console.log(data2); //print data2
    fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => { //baca file append.txt
        console.log(data3); //print data3
      fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => { //write file final.txt sbb data2 dan data3
        console.log('Your file has been written 😁'); //print file final.txt    
      });
    });
  }); 
});
console.log('Will read file!');*/

////////////////////////////////////
////SERVER
/*const server = http.createServer((req, res) => {  //create server
    //console.log(req); //print request
    console.log(res); //print response      
    res.end('Hello from the server!'); //end response
});

server.listen(8000, '127.0.0.1', () => { //listen to port 8000
    console.log('Listening to requests on port 8000'); //print message
});*/

/////////////////////////////////////
//URLs (Hosting)
//synchronous way
const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    } else if (pathName === '/product') {
        res.end('This is the product');
    } else if(pathName === '/apo'){

      //async way
      //fs.readFile('./starter/dev-data/data.json', 'utf-8', (err, data) => {
        //const productData = JSON.parse(data); //menukar teks json ke object(struktur data)
        res.writeHead(200, { //menulis header response
          'Content-type': 'application/json'  // 
        })
        res.end(data);
    //});
    } else {
        res.writeHead(404, {
          'Content-type': 'text/html',
          'my-own-header': 'hello-world'
        });
        res.end('<h1>This page could not be found<h1>');
    }
});
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});


