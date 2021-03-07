//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User');
const Room = require('./models/Room');
const Queue = require('./models/Queue');

//associations could go here!
User.belongsTo(Room)
Queue.belongsTo(User)
Queue.belongsTo(Room)

const syncAndSeed =  async()=> {
  await db.sync({force: true})
  const users = await Promise.all([
    User.create({username: 'cody@email.com', password: '123'}),
    User.create({username: 'murphy@email.com', password: '123'})
  ])
  const [cody, murphy] = users;

  const room = await Room.create({name: 'original-room'})
  cody.roomId = room.id
  await cody.save()

  const testSong = await Queue.create({
    name: 'First Song',
  })
  testSong.roomId = room.id
  // testSong.userId = cody.id
  await testSong.save()

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
    Queue
  }
}
