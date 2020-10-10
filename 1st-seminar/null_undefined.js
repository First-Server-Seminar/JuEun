// null, undefined 실습
/*📌null
- 다른 언어에선 ‘존재하지 않는 객체에대한 참조’나 ‘널 포인터(null pointer)’를 나타낼때 사용함.
- 자바스크립트에선 null을 ‘존재하지않는값(nothing)’, ‘비어있는값’ 을 나타내는데 사용함.
📌undefined
- undefined는 ‘값이 할당되지 않은 상태’를 나타낼때 사용함.
- 변수는 선언했지만, 값을 할당하지 않았을때 Undefined..*/

let nothing = null;
console.log(`nothing : ${nothing}, type: ${typeof nothing}`); 
//type: null 이라고 떠야 되는데 ECMA 오류로 object라고 뜨는 것...

let x;
console.log(`x: ${x}, type ${typeof x}`); 


// null vs undefined
console.log('null vs undefined');
console.log('null === undefined: ', null === undefined); //===는 type 비교, type이 다르니까 
console.log('null == undefined: ', null == undefined); //==는 type 비교가 아니라 값만 보는 것

/*출력
nothing : null, type: object
x: undefined, type undefined
null vs undefined
null === undefined:  false
null == undefined:  true
*/