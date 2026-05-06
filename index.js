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
const replaceTemplate = (temp, product) => {  //function to replace template with product data
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); 
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
}

const tempOverview = fs.readFileSync('./starter/templates/template-overview.html', 'utf-8');
const tempProduct = fs.readFileSync('./starter/templates/template-product.html', 'utf-8');
const tempCard= fs.readFileSync('./starter/templates/template-card.html', 'utf-8');

const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);
    // Overview page
    if (pathname === '/' || pathname === '/overview') {
      res.writeHead(200, { //menulis header response
        'Content-type': 'text/html'  
      })

      const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join(''); //
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml); //replace product cards with product data
        res.end(output);
        // Product page
    } else if (pathname === '/product') {
      res.writeHead(200, { //menulis header response
        'Content-type': 'text/html'  
      });
      const product = dataObj[query.id];  //ambil product data dari query id
      const output = replaceTemplate(tempProduct, product);  //gantikan template product dengan product data
        res.end(output);
        // API
    } else if(pathname === '/apo'){

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


