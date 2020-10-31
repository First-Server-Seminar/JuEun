const express = require('express');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
let membersDB = require('../../modules/members');

/** 멤버를 생성 */
router.post('/', (req, res) => {
    const { name, part, age } = req.body;

    if(!name || !part || !age) {
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    const idx = membersDB[membersDB.length - 1].idx + 1;
    membersDB.push({
        idx,
        name,
        part,
        age
    })
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_CREATE_SUCCESS, membersDB));
});


/** 모든 멤버 조회 */
router.get('/', (req, res) => {
    const members = membersDB;
 
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, members));
});


/** idx 값으로 특정 멤버 조회 */
router.get('/:idx', (req, res) => {
    const { idx } = req.params; //parameter로 idx 받아와서 변수에 저장

    if(!idx) {
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const member = membersDB.find(member => member.idx == idx);
    //받아온 idx값이 membersDB에 존재하는지 체크

    //유효안할 시 bad request
    if (member === undefined) {
        console.log('idx가 유효하지 않습니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    //찾았을 시 responseOK
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_SUCCESS, member));
})


/** idx값으로 특정 멤버 삭제 */
router.delete('/:idx', (req, res) => {
    const { idx } = req.params;

    if(!idx) {
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const member = membersDB.filter(member => member.idx == idx); //filter 메소드 사용

    if (member.length == 0) {
        console.log('idx가 유효하지 않습니다.');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    membersDB = membersDB.filter(member => member.idx != idx);
    //멤버 삭제 위해서 filter() array method 사용해서 클라이언트에서 받아온 idx 값이 아닌 것들만 채택
    //membersDB에 재할당.. 삭제하려는 member만 제외하고 DB에 저장..
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_DELETE_SUCCESS, member));
});


/** idx값으로 특정 멤버 정보 수정 */
router.put('/:idx', (req, res) => {
    const { idx } = req.params; //parameter로 특정 idx 받고
    const { name, part, age } = req.body; //수정할 내용 적기

    //idx 값 없을 시
    if(!idx) {
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //필요한 body 없을 시
    if (!name || !part || !age) {
        console.log('필요한 값이 없습니다!');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    //findindex() arrayMethod를 이용해서 idx값이 몇번째 배열에 있는지 확인 가능
    const memberIdx = membersDB.findIndex(member => member.idx == idx);
   
    if(memberIdx === -1) {
        console.log('idx가 유효하지 않습니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    membersDB[memberIdx] = {
        idx: Number.parseInt(idx), //int형으로 변환
        name,
        part,
        age,
    }
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_UPDATE_SUCCESS, membersDB));
});

module.exports = router;