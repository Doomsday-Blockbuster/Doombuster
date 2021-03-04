//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Room = require('./models/Room');
const Song = require('./models/Song');

//associations could go here!
User.belongsTo(Room)
Song.belongsTo(User)
Song.belongsTo(Room)

const syncAndSeed =  async()=> {
  await db.sync({force: true})
  const users = await Promise.all([
    User.create({username: 'cody@email.com', password: '123'}),
    User.create({username: 'murphy@email.com', password: '123'})
  ])
  const [cody, murphy] = users;

  return {
    users: {
      cody,
      murphy
    }
  };
}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Room,
    Song
  }
}
