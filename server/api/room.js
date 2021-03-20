const router = require('express').Router()
const { models: {Room}} = require('../db');
const { findRoomByCode } = require('../db/models/Room');
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    res.send(await Room.create(req.body)); 
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const roomId = await Room.findRoomByCode(req.params.id)
    res.send({roomId})
  } catch (ex) {
    //console.log('******************',ex.status)
    next(ex)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Room.destroy({
      where: {
        roomCode: req.params.id
      }
    })
  } catch (err) {
    next(err)
  }
})