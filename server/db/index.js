//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/user");
const Room = require("./models/room");
const Song = require("./models/song");
const Vote = require("./models/vote");

//associations could go here!
User.belongsTo(Room);
Song.belongsTo(User);
Song.belongsTo(Room);
Room.hasMany(Song);

//associations added by Jared
Vote.belongsTo(Song);
Vote.belongsTo(User);
User.hasMany(Vote);
Song.hasMany(Vote);

//sync and seed....
const syncAndSeed = async () => {
  await db.sync({ force: true });
  const users = await Promise.all([
    User.create({ username: "cody@email.com", password: "123", admin: true }),
    User.create({ username: "murphy@email.com", password: "123",admin: true }),
  ]);
  const [cody, murphy] = users;

  const room = await Room.create({ roomCode: 1234 });
  const room2 = await Room.create({ roomCode: 2222 });
  cody.roomId = room.id;
  murphy.roomId = room2.id;
  await cody.save();
  await murphy.save();

  return {
    users: {
      cody,
      murphy,
    },
  };
};

//Jared added Vote to the module.exports below
module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Room,
    Song,
    Vote,
  },
};
