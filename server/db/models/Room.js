const Sequelize = require('sequelize')
const { STRING } = Sequelize
const db = require('../db')

const Room = db.define('room', {
  name: {
    type: STRING
  }
})

module.exports = Room