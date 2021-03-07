const Sequelize = require('sequelize')
const { STRING, TEXT, INTEGER, BOOLEAN} = Sequelize
const db = require('../db')

const Queue = db.define('queue', {
  URL: {
    type: STRING,
    isUrl: true
  },
  name: {
    type: STRING
  },
  description: {
    type: TEXT
  },
  image: {
    type: STRING
  },
  votes: {
    type: INTEGER
  },
  finalPlaylist: {
    type: BOOLEAN
  }
  
})

module.exports = Queue
