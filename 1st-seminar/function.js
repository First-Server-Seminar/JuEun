//범위 실습
/*Function Scope
유효 범위가 함수 범위 내여서 그 밖으로 나가지 못함
전역 함수 외부에서 생성한 변수는 모두 전역(global) 변수
Block Scope
블록의 범위는 if, while, for, function 등에서 볼 수 있는
중괄호 ‘{‘ 와 ‘}’ 사이. 블록스코프를 사용하여 호이스팅 문제 해결 가능*/

if(true){
    var x ='var';
}
console.log(`var: ${x}`);
//var는 function scope, if문의 block 과 관계 없이 접근 가능

if(true){
    let y ='let';
}
console.log(`let: ${y}`); 
//👇👇 let은 bolck scope, block안에서 선언된 값 밖에서 접근 불가능
//ReferenceError: y is not defined

function colorFunction(){
    if(true){
        var color = 'blue';
        console.log(color); //blue
    }
    console.log(color); //blue
}
colorFunction();
console.log(color); 
//👇👇 var은 FunctionScope 이기 때문 function scope 넘어가면 접근 불가
//ReferenceError: color is not defined

