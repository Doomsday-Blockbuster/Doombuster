const Sequelize = require("sequelize");
const { ENUM } = Sequelize;
const db = require("../db");

const Vote = db.define("vote", {
  voteValue: {
    type: ENUM(["-1", "1"]),
  },
});

module.exports = Vote;
