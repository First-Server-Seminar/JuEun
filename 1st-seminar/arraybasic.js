//Array 기본 함수 알아보기

var arr = [1, 2, 3, 4];


// 📌 length
console.log(`arr의 길이: ${arr.length}`); //arr의 길이: 4


// 📌 push, pop
arr.push('new item');
console.log('arr push:', arr); //arr push: [ 1, 2, 3, 4, 'new item' ]
arr.pop();
console.log('arr pop:', arr); //arr pop: [ 1, 2, 3, 4 ]


// 📌 shift, unshift
arr.unshift('first item');
console.log('arr unshift:', arr); //arr unshift: [ 'first item', 1, 2, 3, 4 ]
arr.shift();
console.log('arr shift:', arr); //arr shift: [ 1, 2, 3, 4 ]
 /*📌push,pop은 뒤에를 넣었다 뺐다면 unshift와 shift는 앞에서부터 넣었다 뺀다*/


// 📌 includes
console.log('arr.includes(4):', arr.includes(4)); //arr.includes(4): true ,, 4를 포함하고 있냐
console.log('arr.includes(1000):', arr.includes(1000)); //arr.includes(1000): false


// 📌 indexOf
console.log('arr.indexOf(4):', arr.indexOf(4)); //arr.indexOf(4): 3, 배열의 앞에서부터 뒤쪽으로, 검색해나간다.
//4는 arr[3]이므로 3 출력
console.log('arr.lastIndexOf(4):', arr.lastIndexOf(4)); //arr.lastIndexOf(4): 3, 배열의 뒤에서부터 앞쪽으로, 검색해나간다.
console.log('arr.indexOf(100):', arr.indexOf(100)); //arr.indexOf(100): -1


// 📌 concat  배열과 배열 합치기
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var concatArr = arr1.concat(arr2);
console.log('arr1.concat(arr2):', concatArr); //arr1.concat(arr2): [ 1, 2, 3, 4, 5, 6 ]


// 📌 join
var location = ["주은", "마루", "까페", "배고파"];
console.log(location.join('-> ')); //주은-> 마루-> 까페-> 배고파


// 📌 reverse 
console.log(location.reverse().join('-> ')); //배고파-> 까페-> 마루-> 주은 (반대로)


// 📌 sort
var food = ['Salmon', 'Mango', 'Americano'];
console.log(food.sort( (a, b) => a > b ? 1 : -1) ); // [ 'Americano', 'Mango', 'Salmon' ]
console.log(food.sort( function(a, b) { return a.localeCompare(b); })); //  유니코드 기준으로 문자 정렬, [ 'Americano', 'Mango', 'Salmon' ]

console.log('오름차순 정렬:', concatArr.sort((a, b) => a - b)); //오름차순 정렬: [ 1, 2, 3, 4, 5, 6 ]
console.log('내림차순 정렬:', concatArr.sort(function(a, b) { return  b - a; })); //내림차순 정렬: [ 6, 5, 4, 3, 2, 1 ]


// 📌 filter 
//필터는 배열 요소 전체를 대상으로 조건 제공, 그 조건을 충족하는 결과를 새로운 배열을 반환
var number = [100, 234, -125, 1, 23, -637, -123, 99, 2, 3, 4, 5];
var minusNumber = number.filter( item => item < 0);
console.log('minusNumber: ', minusNumber); //minusNumber:  [ -125, -637, -123 ]


// 📌 map  
//map은 배열 요소 전체를 대상으로 함수 호출, 그 결과를 새로운 배열을 반환할때 주로 사용
var food = ['Salmon', 'Ricecake', 'Americano', 'Mango', 'Bread'];
var foodLengths = food.map( item => item.length );
console.log('foodLengths: ',foodLengths); //foodLengths:  [ 6, 8, 9, 5, 5 ], 각 item 글자 수로 


// 📌 reduce 
//map은 배열 반환 시 사용, reduce는 값 하나 반환시 주로 사용 대표적인 예시로 1 ~ n 까지 더하기
var number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var sum = number.reduce( (previousValue, currentValue) => {
  console.log(`previousValue: ${previousValue}, currentValue: ${currentValue}`);
  return previousValue + currentValue;
});
/*previousValue: 1, currentValue: 2
previousValue: 3, currentValue: 3
previousValue: 6, currentValue: 4
previousValue: 10, currentValue: 5
previousValue: 15, currentValue: 6
previousValue: 21, currentValue: 7
previousValue: 28, currentValue: 8
previousValue: 36, currentValue: 9
previousValue: 45, currentValue: 10*/