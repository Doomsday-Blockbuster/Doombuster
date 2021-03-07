const router = require('express').Router()
const Queue = require('../db/models/queue')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    res.status(200).send(await Queue.findAll());
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    res.status(200).send(await Queue.findAll({
      where: {
        roomId: parseInt(req.params.id)
      }
    }));
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    console.log(`backend` + req.body)
    // const song = await Queue.create(req.body)
    // song.roomId = req.params.id
    // await song.save();
    // res.status(201).send(song)
  } catch (err) {
    next(err)
  }
})