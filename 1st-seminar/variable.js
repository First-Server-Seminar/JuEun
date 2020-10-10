//변수 선언법 실습
//백틱 기호 쓰는 법 ₩ 👉 영문으로 바꿔서 쓰면 ` 나온다!!

var variableVar = "123";
var variableVar = "321";

console.log( `variableVar : ${variableVar}`);
//var은 변수 재선언, 재할당 가능, 초기화 값 불필요

let variableLet = "123";
let variableLet = "321";

console.log( `variableLet : ${variableLet} `);
//let은 재할당 가능, 재선언 불가능 👇👇
//SyntaxError: Identifier 'variableLet' has already been declared

const variableConst = "123";
const variableConst = "321";

console.log( `variableConst : ${variableConst} `);
//const는 초기화 값 필요, 재선언 및 재할당 불가능