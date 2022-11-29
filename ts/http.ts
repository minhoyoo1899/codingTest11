const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

if (!fs.existsSync("../routes")) fs.mkdirSync("../routes",'1234', true); // 비 routes dir 존재 할 경우 생성 
// fs.mkdirSync("../routes", (err: any) => {
//   if (err) throw err;
//   DynamicMakeServer(header, main, footer);
// });

//read
const head = fs.readFileSync('../txt/head.txt', 'utf-8', (err: any) => {
  if (err) throw err;
});

const header = fs.readFileSync('../txt/header.txt', 'utf-8', (err: any) => {
  if (err) throw err;
});

const main = fs.readFileSync('../txt/body.txt', 'utf-8', (err: any) => {
  if (err) throw err;
});

const readBody = () => {
  const bodyText = fs.readFileSync('../txt/body.txt', 'utf-8', (err: any) => {
    if (err) throw err;
  });

  return bodyText;
}

const footer = fs.readFileSync('../txt/footer.txt', 'utf-8', (err: any) => {
  if (err) throw err;
});

const DynamicMakeServer = (childItem1: string, childItem2: string, childItem3: string) => {
  const bodyContext = `${childItem1} ${childItem2} ${childItem3}`;
  const arr = ["a", "b", "c", "d"];
  for (let i = 0; i < arr.length; i++) {
    fs.writeFile(`../routes/${arr[i]}.txt`, arr[i], function (err: any) {
      if (err) throw err;
    });
  }



  // const returnBody = readBody();

  fs.appendFile('../txt/body.txt', bodyContext, (err: any) => {
    if (err) throw err;
    const l_body = readBody();
    //console.log("a");
    //console.log(l_body);
    combine(header, l_body);
  });


  // const l_body:any = fs.readFileSync('../txt/body.txt', 'utf-8', (err: any) => {
  //       if (err) throw err;
  //   }
}

// const bodyChanger = async (childItem1: string, childItem2: string, childItem3: string) => {
//   const bodyContext = `${childItem1} ${childItem2} ${childItem3}`;

//   // const returnBody = readBody();

//    const updatBody = await fs.appendFile('../txt/body.txt', bodyContext, (err: any) => {
//       if (err) throw err;
//    }).then(readBody()).then((res: any) => {
//      console.log(res);
//     })


// // const l_body:any = fs.readFileSync('../txt/body.txt', 'utf-8', (err: any) => {
// //       if (err) throw err;
// //   }

//   return updatBody;
// }

// const promise = () => {
//   fs.readFileSync('../txt/body.txt', 'utf-8', (err: any) => {
//     if (err) throw err;
//   });
// }

// const bodyText = readBody();
// console.log("b");
// console.log(bodyText);

function htmlStructure(head: string, body: string) {
  return `<html> <head>${head}</head> <body> ${body} </body></html>`;
}

const combine = (head: string, body: string) => {
  const routeA = fs.readFileSync('../routes/a.txt', 'utf-8', (err: any) => {
    if (err) throw err;
  });

  const routeB = fs.readFileSync('../routes/b.txt', 'utf-8', (err: any) => {
    if (err) throw err;
  });

  const routeC = fs.readFileSync('../routes/c.txt', 'utf-8', (err: any) => {
    if (err) throw err;
  });

  const routeD = fs.readFileSync('../routes/d.txt', 'utf-8', (err: any) => {
    if (err) throw err;
  });
  const index = `<html> <head>${head}</head> <body> ${body} </body></html>`;
  const a = `<html> <head>${head}</head> <body> ${routeA} </body></html>`;
  const b = `<html> <head>${head}</head> <body> ${routeB} </body></html>`;
  const c = `<html> <head>${head}</head> <body> ${routeC} </body></html>`;
  const d = `<html> <head>${head}</head> <body> ${routeD} </body></html>`;
  openServer(index, a, b, c, d);
}

function openServer(index: string, a: string, b: string, c: string, d: string) {
  const server = http.createServer((req: any, res: any) => {
    let url = req.url;
    if (req.method === "GET") {
      switch (url) {
        case '/':
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.write(index);
          res.end();
          break;
        case '/a':
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.write(a);
          res.end();
          break;
        case '/b':
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.write(b);
          res.end();
          break;
        case '/c':
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.write(c);
          res.end();
          break;
        case '/d':
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.write(d);
          res.end();
          break;
        // default:
        //   res.writeHead(405, { 'Content-Type': 'text/html; charset=UTF-8' });
        //   res.write('Method Not Allowed');
        //   res.end();
        //   break;
      }
    }
  });
  server.listen(5678, (error: any) => { if (error) throw error; });
}

DynamicMakeServer(header, main, footer);


// console.log(combine(,);

// const htmlFile = combine(head, body);

// console.log(htmlFile);

// function htmlMaker(head: string, body: string, ) {
//   const htmlString = `${head} + `;
//   // let htmlString = "";
//   // htmlString += `<!DOCTYPE html><html lang="en">`;
//   // htmlString += `<head>`;
//   // htmlString += `${head}`;
//   // htmlString += `</head>`;
//   // htmlString += `<body>`;
//   // htmlString += `${body}`;
//   // htmlString += `</body>`;
//   // htmlString += `</html>`;
//   return htmlString;
// }



// const server = http.createServer((request: any, response: any) => {
//   let getMethod = request.method;
//   switch (getMethod) {
//     case 'GET':
//       response.writeHead(200, { 'Content-Type': 'text/html' });
//       const htmlFile = combine(head, body);
//       response.write(htmlFile);
//       response.end();
//       break;
//     default:
//       response.writeHead(405, { 'Content-Type': 'text/html' });
//       response.write('Method Not Allowed');
//       response.end();
//       break;
//   }
// });
// server.listen(5678, (error: any) => {if(error) throw error});