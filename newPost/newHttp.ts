import http from "http";
import * as fs from "fs";

function fileString(dir: string, fileName: string) {
  const readString = fs.readFileSync(`${dir}/${fileName}`, 'utf-8');
  return readString;
}

const index = fileString("./", "index.html");
console.log(index);

const server = http.createServer((req: any, res: any) => { 
  let url = req.url;
  switch (req.method) {
    case "GET":
      if (url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.write(index);
        res.end();
      }
      break;
    
    case "POST":
      if (url === "/setjson") {
        const jsonMap = new Map();
        req.on("data", (data: any) => {
          const decordDat = decodeURI(data);
          const newMap = new URLSearchParams(decordDat);

          for (const [k, v] of newMap) {
            jsonMap.set(k, v);
          }
          const time = new Date();
          jsonMap.set("NOW",time.toLocaleString());
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
});

server.listen(7979);