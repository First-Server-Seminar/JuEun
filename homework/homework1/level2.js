//팀원 소개 json Array
//이름, 사는 곳, 나이, 취미, 정보 출력 함수 포함

const ServerMembers = [
    {
        name: "이주은",
        home: "경기도 군포시",
        age: "24",
        hobby: "우리집 강아지랑 뒹굴거리기, 요리하기"    
    },
    {
        name: "오승재",
        home: "서울특별시 중랑구",
        age: "23",
        hobby: "게임하기, 맛있는거 먹기, 돌아다니기"    
    },
    {
        name: "김채원",
        home: "서울시 양천구",
        age: "22",
        hobby: "자전거타기, 강아지 영상보기, 염색하기"    
    },
    {
        name: "김기문",
        home: "서울 동작구 상도동",
        age: "26",
        hobby: "우리집 고양이랑 뒹굴거리기, 기타치기"    
    },
]

function printMembers(){
    ServerMembers.forEach( item => {
        console.log(item); 
      })
}
printMembers();