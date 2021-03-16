const router = require("express").Router();
const Vote = require("../db/models/Vote");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const vote = await Vote.create(req.body);
    res.send(vote);
  } catch (err) {
    next(err);
  }
});

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const song = await Song.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });
//     await song.destroy();
//     res.sendStatus(201);
//   } catch (err) {
//     next(err);
//   }
// });
