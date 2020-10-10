// 배열 선언 실습

var arr1 = [];
console.log(arr1); //[]
console.log(typeof arr1); //object

var arr2 = new Array(1,2,3,4,5);
console.log(arr2); //[ 1, 2, 3, 4, 5 ]
console.log(typeof arr2); //object

var arr3 = ['이주은', 1, 2, 3, null, {name: 'juju', age: 24}];
console.log(arr3); //[ '이주은', 1, 2, 3, null, { name: 'juju', age: 24 } ]
console.log(typeof arr3); //object

// 배열 순회 실습
var serverPart = ["이주은1", "이주은2", "이주은3", "이주은4", "이주은5", "이주은6", "이주은7"];
let serverIndexStr = '서버파트 이주은이 7명이나 있군요 "';
let serverPartMemberNameStr = '서버파트 여러분 이름 불러보셔요~ "'

for(let item in serverPart){
  serverIndexStr += item + '! ';
}
console.log(serverIndexStr); //서버파트 이주은이 7명이나 있군요 "0! 1! 2! 3! 4! 5! 6! 

for(let item of serverPart) {
  serverPartMemberNameStr += item + '! ';
}
console.log(serverPartMemberNameStr); //서버파트 여러분 이름 불러보셔요~ "이주은1! 이주은2! 이주은3! 이주은4! 이주은5! 이주은6! 이주은7! 

serverPart.forEach( item => {
  console.log(item); 
})
/*이주은1
이주은2
이주은3
이주은4
이주은5
이주은6
이주은7*/
