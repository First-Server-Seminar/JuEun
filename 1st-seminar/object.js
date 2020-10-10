//Object 실습
//Promise도 객체

const person = new Object(); // 빈 객체 생성

//add Property
person.name = '이름'; // 점표기법 이용
person.part = 'Server';
person["gender"] = 'female'; // 브라켓 표기법, 배열 내부 이용
person.sayHello = function () {
	console.log(`안녕하세요 ${this.name} 입니다.`);
}

console.log(typeof person); //object
console.log(person); //{ name: '이름', part: 'Server', gender: 'female', sayHello: [Function] }

person.sayHello(); //안녕하세요 이름 입니다.

console.log('=====================');

/* 객체 리터럴 (가장 일반적인 자바스크립트의 객체 생성 방식) */
const emptyObject = {}; // 빈 객체 생성
console.log(typeof emptyObject); // object

const animal = {
	animalType: "dog",
	animalName: "뽀삐",
	animalFriends: ['코코', '초코', '쿠키'],
	bark: function() {
		console.log(`${this.animalName}: 멍멍`);
	},
	thisFriends: function() {
		this.animalFriends.forEach( friend => {
			console.log(`${this.animalName}의 친구: ${friend}`);
		})
	},
};

console.log(animal);
/*{
  animalType: 'dog',
  animalName: '뽀삐',
  animalFriends: [ '코코', '초코', '쿠키' ],
  bark: [Function: bark],
  thisFriends: [Function: thisFriends]
}*/

animal.bark(); //뽀삐: 멍멍

animal.thisFriends(); 
/*뽀삐의 친구: 코코
뽀삐의 친구: 초코
뽀삐의 친구: 쿠키*/