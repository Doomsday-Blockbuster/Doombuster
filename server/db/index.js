//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Room = require("./models/Room");
const Song = require("./models/Song");
const Vote = require("./models/Vote");

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
    User.create({ username: "cody@email.com", password: "123" }),
    User.create({ username: "murphy@email.com", password: "123" }),
  ]);
  const [cody, murphy] = users;

  const room = await Room.create({ name: "original-room" });
  cody.roomId = room.id;
  await cody.save();

  await Vote.create({ voteValue: 1 });

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
