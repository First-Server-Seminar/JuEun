const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const { User } = require('../../models');

/** 📌 회원가입  */
router.post('/signup', async (req, res) => {
  // email, password, userName data 모두 다 적어주어야 회원가입 가능!
  if (!email || !password || !userName) {
    console.log('필요한 값이 없습니다!');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  try {
    // 존재하는 이메일인지 확인 
    // 이미 존재하는 이메일면 ALREADY ID 반환
    const alreadyEmail = await User.findOne({
      where: {
        email: email,
      }
    });

    if (alreadyEmail) {
      console.log('이미 존재하는 이메일 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
  }
  
  // salt 생성
  const salt = crypto.randomBytes(64).toString('base64');
  
  // pbkdf2 방식으로 (비밀번호 + salt) => 암호화된 hashedPassword
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  
  // 디비에 생성, 회원가입, 최초 생성 => create
  const user = await User.create({
      email: email,
      password: hashedPassword,
      userName: userName,
      salt: salt,
  });
  
  console.log(user);
  // 비밀 번호 제외 return
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, { id: user.id, email, userName }));
} catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
  } 
})


/** 📌 로그인  */
router.post('/signin', async (req, res) => {
  const {email, password} = req.body; 

  // 로그인 시 이메일, pw 입력 안하면 오류 발생
  if(!email || !password) {
    console.log('필요한 값이 없습니다!');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
   }
   
   //디비에 있는 이메일인지 확인
  try{
    const alreadyEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    console.log(alreadyEmail);

    //const alreadyEmail 디비에 없다면 없는 이메일 => 로그인 불가능
    if(!alreadyEmail) {
      console.log('없는 이메일 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    const { salt, password : hashedPassword } = alreadyEmail;
    const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

    //비밀번호, 비밀번호 확인 일치 체크
    if(inputPassword !== hashedPassword){
      console.log('비밀번호가 일치하지 않습니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.OK, responseMessage.MISS_MATCH_PW));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, { id, email, userName }));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
  }
})


/** 📌 조회  */
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'userName'],
    });

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, users));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.MEMBER_READ_ALL_FAIL));
  }
});


/** 📌 특정 id 조회 */
router.get('/:id', async (req, res) => {
  // /id, parameter로 id 받기 
  const { id } = req.params;
  try{
    const user = await User.findOne({
      where: {
        id: id,
      },
    })

    if (!user) {
      console.log('존재하지 않는 아이디 입니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, user));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_USER_FAIL));    
  }
});


/** 📌 특정 id 삭제 */
router.delete('/:id', async (req, res) => {
  // /id parameter로 받아온 id 찾아서 delete
  const { id } = req.params;

  //Sequelize 에서 destroy 는 delete 기능 수행 
  try{
      const user = await User.destroy({
          where: {
              id: id
          }
      });
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_DELETE_SUCCESS));
  } catch(error){
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_USER_FAIL));    
  }
})

/** 📌 특정 id 수정 */
router.put('/:id', async (req, res) => {
  // /id parameter로 받아온 id 찾아서 email, username, password수정
  const { id } = req.params;
  const { email, userName, password } = req.body;

  try{
      const user = await User.findOne({
        where: {
          id: id
        },
        attributes: ['id', 'email', 'userName', 'password'],
      });

      // 있는 아이디인지 확인, 존재하지 않는 아이디면 수정 불가능
      if(!user) {
        console.log('존재하지 않는 아이디 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }

      const salt = crypto.randomBytes(64).toString('base64');
      //pbkdf2 방식으로 (비밀번호 + salt) => 암호화된 password
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  
      const UpdatedUser = await User.update({email: email, userName: userName, password: hashedPassword}, {
        where: {
            id: id
        }
      });
      
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_USER_SUCCESS, UpdatedUser));
  } catch(error){
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_USER_FAIL));    
  }
})

module.exports = router;