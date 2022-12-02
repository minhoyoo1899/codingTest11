import http from "http";
import * as fs from "fs";
import path from "path";
import url from "url";

// const http = require('http'); // import방식으로 에러처리가 안고쳐져서 일단 require방식으로 선언 후 사용 
// const fs = require('fs');

// const path = require('path');
//  const url = require('url');
// const http:any = new http();

const abcArr = ["a", "b", "c", "d"];

if (!fs.existsSync("../routes")) fs.mkdirSync("../routes", '1234'); // 비 routes dir 존재 할 경우 생성
if (!fs.existsSync("../json")) fs.mkdirSync("../json", '1234');
// fs.mkdirSync("../routes", (err: any) => {
//   if (err) throw err;
//   DynamicMakeServer(header, main, footer);
// });

function fileString(dir: string, fileName: string) {
  const readString = fs.readFileSync(`../${dir}/${fileName}`, 'utf-8');
  // const readString = fs.readFileSync(`../${dir}/${fileName}`, 'utf-8', (err: any, data:any) => {
  //   if (err) throw err;
  //   console.log(data);
  // });
  // console.log(readString);
  return readString;
}


const txtArr = new Array();
fs.readdir('../bodyStructure', function (err: any, filelist: Array<string>) {
  if (err) throw err;
  // fs모듈의 readdir함수를 사용해
  // 첫번째 인자로 파일 목록을 읽을 폴더(dir)를 가져오고
  // 콜백함수의 두번째 인자로 폴더(dir)의 파일목록(filelist)을 가져옴

  // console.log(Array.isArray( filelist));
  // console.log(filelist);

  for (let i = 0; i < filelist.length; i++) {
    const textString = fileString("bodyStructure", filelist[i]);
    // console.log(textString);
    txtArr.push(textString);
  }
  DynamicMakeServer(txtArr);
});



const head = fs.readFileSync('../txt/head.txt', 'utf-8');
// const head = fs.readFileSync('../txt/head.txt', 'utf-8', (err: any) => {
//   if (err) throw err;
// });

const formTag = fs.readFileSync('../formTag/form.txt', 'utf-8');
// const formTag = fs.readFileSync('../formTag/form.txt', 'utf-8', (err: any) => {
//   if (err) throw err;
// });
// console.log(formTag);
const formJson = fs.readFileSync('../formTag/jsonform.txt', 'utf-8');

const readBody = () => {
  const bodyText = fs.readFileSync('../txt/body.txt', 'utf-8');
  // const bodyText = fs.readFileSync('../txt/body.txt', 'utf-8', (err: any) => {
  //   if (err) throw err;
  // });

  return bodyText;
}

// const header = fs.readFileSync('../bodyStructure/header.txt', 'utf-8', (err: any) => {
//   if (err) throw err;
// });

// const main = fs.readFileSync('../bodyStructure/main.txt', 'utf-8', (err: any) => {
//   if (err) throw err;
// });

// const footer = fs.readFileSync('../bodyStructure/footer.txt', 'utf-8', (err: any) => {
//   if (err) throw err;
// });

const DynamicMakeServer = (stArr: Array<string>) => {
  //console.log(stArr);
  const bodyContext = `${stArr[1]} ${stArr[2]} ${stArr[0]}`; // join으로 합치고 싵은데 순서가 맞지않아 일단 이렇게 처리

  for (let i = 0; i < abcArr.length; i++) {
    fs.writeFile(`../routes/${abcArr[i]}.txt`, abcArr[i], function (err: any) {
      if (err) throw err;
    });
  }

  // const returnBody = readBody();

  fs.appendFile('../txt/body.txt', bodyContext, (err: any) => {
    if (err) throw err;
    const l_body = readBody();
    //console.log("a");
    //console.log(l_body);
    combine(head, l_body, formTag, formJson);
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

const combine = (head: string, body: string, formTag:string, formJson: string) => {
  const routesArr: Array<string> = new Array();
  // const routesObj: Object = new Object();
  const index = `<html> <head>${head}</head> <body> ${body} </body></html>`;
  fs.readdir('../routes', function (err: any, filelist: Array<string>) {
    if (err) throw err;     
    for (let i = 0; i < filelist.length; i++) {
      const textString = htmlStructure(head, fileString("routes", filelist[i]));
      routesArr.push(textString);
    }
    const formString = htmlStructure(head, formTag);
    // console.log(formString);
    routesArr.push(formString);
    const jsonString = htmlStructure(head, formJson);
    routesArr.push(jsonString);
    openServer(index, routesArr);
  });

  // const routeA = fs.readFileSync('../routes/a.txt', 'utf-8', (err: any) => {
  //   if (err) throw err;
  // });

  // const routeB = fs.readFileSync('../routes/b.txt', 'utf-8', (err: any) => {
  //   if (err) throw err;
  // });

  // const routeC = fs.readFileSync('../routes/c.txt', 'utf-8', (err: any) => {
  //   if (err) throw err;
  // });

  // const routeD = fs.readFileSync('../routes/d.txt', 'utf-8', (err: any) => {
  //   if (err) throw err;
  // });

  // const a = `<html> <head>${head}</head> <body> ${routeA} </body></html>`;
  // const b = `<html> <head>${head}</head> <body> ${routeB} </body></html>`;
  // const c = `<html> <head>${head}</head> <body> ${routeC} </body></html>`;
  // const d = `<html> <head>${head}</head> <body> ${routeD} </body></html>`;
}

function openServer(index: string, routArr: Array<string>) {
  // console.log(routArr);
  const server = http.createServer((req: any, res: any) => {
    let url = req.url;
    // console.log(url);
    // console.log(typeof url);
    // console.log(url[1]);
    // console.log(routArr.includes(url[1]));
    // console.log(abcArr.find(v => v === url[1]));
    // const addr = abcArr.find(v => console.log(v), "a"); console.log(addr);
    
    switch (req.method) {

      case "GET":
        if (url === "/") {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.write(index);
            res.end();
        } else {
          rounting(res, routArr, url);
        }
        break;
      
      case "POST":
        // console.log('POST');
        // console.log(res);
        // req.on('/sendDat', (data: any) => { 
        //   console.log(data);
        // });
        //console.log(req);
        if (url === "/sendDat") {
          const reqArr: any = new Array();
          req.on("data", (data: any) => { //"data" === 콜백함수 명령어
             console.log(data);
             console.log(decodeURI(data));
            // console.log(typeof data);
            
            const decordDat = decodeURI(data);
            const newMap = new URLSearchParams(decordDat);
             console.log(newMap);
            // console.log(typeof newMap);
            // console.dir(newMap);
            const spDat = decordDat.split("&");
            const stringArr: any = new Array();
            // console.log(spDat);
            for (let i = 0; i < spDat.length; i++) {
              const data = spDat[i].split("=");
              // console.log(data);
              stringArr.push(...data);
            }

            for (let i = 0; i < stringArr.length; i++) {
              if (i % 2 === 1) {
                reqArr.push(stringArr[i]);
              }
            }
            // console.log(reqArr);
            
            //배열을 하나로 합친다음 짝수번째 값만 출력하게 
            
            // console.log(decordDat);
            // console.log(decordDat.split("&").split("="));
            // for (let i = 0; spDat.length; i++) {
            //   const splitData = spDat[i].split("=");
            //   console.log(splitData);
            // }
            // console.log(typeof decordDat);
            // const obj:any = new Object();
            // for (const [k, v] of decordDat) {
            //   obj[k] = v;
            // }
            // console.log(obj);

          })
          req.on("end", () => {
            const reqJoin = reqArr.join("<br/>");
            const html = htmlStructure(head, reqJoin);
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write(html);
            res.end();
          });
          // console.log(req);
          // console.log(res);
          // res.writeHead(302, {
          //   'Location': '/formDat'
          //   //add other headers here...
          // });
          // res.end();
        } else if (url === "/mkjson") {
          const jsonMap = new Map();
          req.on("data", (data: any) => {
            const decordDat = decodeURI(data);
            const newMap = new URLSearchParams(decordDat);
            
            // console.log(newMap);
            for (const [k, v] of newMap) {
              jsonMap.set(k, v);
            }
            
            // console.log(jsonMap);
          });
          req.on("end", () => {
            const mapString = JSON.stringify(Array.from(jsonMap.entries()));
            fs.writeFileSync("../json/mkjson.json", mapString);
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            res.write(mapString);
            res.end();
          });
        }
        break;
      
      case "PUT":
        console.log("PUT");
        break;

      case "DELETE":
        console.log("DELETE");
        break;
      
      case "PATCH":
        console.log("PATCH");
        break;
      
      default:
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.write('Method Not Allowed');
        res.end();
        break;
    }

    // if (req.method === "GET") {
    //   rounting(res, index, routArr, url);
    //   // for (let i = 0; i < routArr.length; i++) {
    //   //   if (url === `/${abcArr[i]}`) {
    //   //     rounting(res, routArr[i]);
    //   //   }
    //   // }



    //   // switch (url) {
    //   //   default:
    //   //     rounting(res, index);
    //   //     // res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    //   //     // res.write(index);
    //   //     // res.end();
    //   //     break;
    //   //   case `/${abcArr[0]}`:
    //   //     rounting(res, routArr[0]);
    //   //     break;



    //   //   for (let i = 0; i < routArr.length; i++) {
    //   //     case `/${abcArr[i]}`:
    //   //     rounting(res, routArr[i]);
    //   //     break;
    //   //     }  

    //   //   case '/a':
    //   //     res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    //   //     res.write(a);
    //   //     res.end();
    //   //     break;
    //   //   case '/b':
    //   //     res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    //   //     res.write(b);
    //   //     res.end();
    //   //     break;
    //   //   case '/c':
    //   //     res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    //   //     res.write(c);
    //   //     res.end();
    //   //     break;
    //   //   case '/d':
    //   //     res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    //   //     res.write(d);
    //   //     res.end();
    //   //     break;
    //   // }

    // }
  });
  server.listen(5678);
  // server.listen(5678, (error: any) => { if (error) throw error; });
}



function rounting(res: any, arr: Array<string>, url: string) {  
  // console.log(res);
  // console.log(arr);
  // console.log(url);
  switch (url) {
    case "/a":
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.write(arr[0]);
      res.end();
      break;
    
    case "/b":
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.write(arr[1]);
      res.end();
      break;
    
    case "/c":
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.write(arr[2]);
      res.end();
      break;
    
    case "/d":
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.write(arr[3]);
      res.end();
      break;
    
    case "/form":
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.write(arr[4]);
      res.end();
      break;
    
    case "/json":
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.write(arr[5]);
      res.end();
      break;
    
  }
}




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