const router = require('express').Router()
const { default: axios } = require('axios')
const { models: { User, Room }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.get(`/:id`, async (req, res, next) => {
  try {
    const roomPeeps = await User.findAll({
      where: {
        roomId: req.params.id
      }
    })
    console.log(`roooooooom peeps:`,roomPeeps)

    //const roomPeeps = User.getPeeps(req.params.id)
    res.send(roomPeeps)
  } catch (err) {
    next(err)
  }
})

router.put(`/:id`, async(req,res,next)=>{
  try{
    const currentAdmin = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    currentAdmin.roomId = null;
    currentAdmin.admin = false;
    await currentAdmin.save()
    //console.log(`current`,currentAdmin)
    const newAdmin = await User.findOne({
         where: {
           roomId: req.params.id
         }
    })
    //if undefined then delete room!!!
    console.log(newAdmin)
    console.log(`new`,newAdmin)
    if(newAdmin){
      newAdmin.admin= true;
      await newAdmin.save()
      console.log(`newadmin`,newAdmin)
    }else{
      //cascade: sequelize....any associations get deleted with it
      await Room.destroy({where: {
        id: req.params.id
      }})
    }
    res.sendStatus(200);

  }catch(err){
    next(err)
  }
})