const router = require('express').Router()
const Song = require('../db/models/Song')
module.exports = router


// router.get('/', async (req, res, next) => {
//   try {
//     res.status(200).send(await Song.findAll());
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:id', async (req, res, next) => {
  try {
    //req.params.id = parseInt(req.params.id)
    res.status(200).send(await Song.findAll({
      where: {
        roomId: req.params.id
      },
      order: [['id']],
    }));
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async(req, res, next) => {
  try {
    const song = await Song.create(req.body)
    song.roomId = req.params.id
    await song.save();
    res.status(201).send(await Song.findAll())
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async(req, res, next) => {
  try {
    const song = await Song.findOne({
      where:{
        id:req.params.id
      }
    })
    await song.destroy();
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})