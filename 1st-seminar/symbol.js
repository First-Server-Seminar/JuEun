//symbol 실습
/* Symbole은 유일한 식별자를 만들고 싶을때 사용함.
- ES6이후에 나온 원시타입, 잘 사용은 안 하는 듯...*/

const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
//같은 description이어도 각 symbol마다 고유 값을 갖고 있다

console.log(symbol1.description) //id
console.log(symbol1 === symbol2); //false

console.log('--------------');

const includes = Symbol('커스텀 includes 함수');

Array.prototype[includes] = function() {
  return 'its Symbol';
}

var arr = [1, 2, 3];
console.log(arr.includes(1)); //true, JS 기본 includes 함수array에 그 값 포함하고 있으면 true return
console.log(arr['includes'](1)); // true, JS 기본 includes 함수
console.log(arr[includes]()); //its Symbol, 커스텀 includes 함수

/*출력
id
false
--------------
true
true
its Symbol
*/