const router = require('express').Router()
const { models: {User,Room}} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    //console.log(req.body)
    let roomId
    if(req.body.roomOption==='newRoom'){
      const room = await Room.create({roomCode:req.body.roomCode})
      roomId = room.id
    }else{
      roomId = await Room.findRoomByCode(req.body)
    }
    res.send({ token: await User.authenticate(req.body,roomId,req.body.roomOption)}); 
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Room already exists')
    } else {
      next(err)
    }
  }
})

//github callback if using github OAUTH
router.get('/youtube/callback', async(req, res, next)=> {
  //User.authenticateGithub will attempt to use code to find a user in our system.
  //if successful, a jwt token will be returned
  //that token will be set in localStorage
  //and client will redirect to home page
  //console.log('QUERY',req.query)
  try {
    res.send(
      `
      <html>
      <body>
        <script>
        window.localStorage.setItem('token', '${await User.authenticateGoogle(req.query.code)}');
        window.document.location = '/';
        </script>
      </body>
      </html>
      `);
  }
  catch(ex){
    next(ex);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    let roomId
    if(req.body.roomOption==='newRoom'){
      const room = await Room.create({roomCode:req.body.roomCode})
      roomId = room.id
      user.admin='TRUE'
    }else{
      roomId = await Room.findRoomByCode(req.body)
    }
    user.roomId=roomId
    await user.save()
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.errors[0].message==='roomCode must be unique'){
      res.status(401).send('User Created Successfully ! Room already exists,Please login using different room code')
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
     console.log('ERROR MESSAGE**************',err.errors[0].message)
      res.status(401).send('User already exists')
    }else if (err.ValidationErrorItem.message='roomCode must be unique'){
      res.status(401).send('Room alread exists')
    }else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
