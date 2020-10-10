//hoisting 실습
/* 자바스크립트는 초기화가 아닌 선언만 함수의 최상위로 끌어 올림(hoist)
- 코드의 가독성과 유지보수를 위해 Hoisting이 일어나지 않도록 한다.
- Hoisting을 제대로 모르더라도 함수와 변수를 가급적 코드 상단부에서 선언하면,
 Hoisiting으로 인한 스코프 꼬임 현상은 방지할 수 있다.
- let , const를 사용한다 */

hoistFunction();

function hoistFunction(){
    console.log(x); //undefined
    var x = 'var';
    console.log(x); //var
}