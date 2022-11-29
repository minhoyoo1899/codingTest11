const fss = require('fs');

const test = fss.readFileSync('../body/body.txt', 'utf-8', (err: any) => {
  if (err) throw err;
});

console.log(test);
console.log("" === test);
console.log(null === test);
console.log(undefined === test);
console.log(typeof test);