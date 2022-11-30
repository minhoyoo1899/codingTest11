const minho: string = "나는 유민호 입니다.";
const encordMinho: string = encodeURI(minho);
const decordMinho: string = decodeURI(encordMinho);
console.log(minho);
console.log(encordMinho);
console.log(decordMinho);