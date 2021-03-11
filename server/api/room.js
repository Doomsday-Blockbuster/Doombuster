const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    res.send(await Room.create(req.body)); 
  } catch (err) {
    next(err)
  }
})