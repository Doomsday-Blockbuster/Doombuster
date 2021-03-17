const router = require("express").Router();
const Song = require("../db/models/Song");
const Vote = require("../db/models/Vote");
const { Op } = require("sequelize");
module.exports = router;

// router.get('/', async (req, res, next) => {
//   try {
//     res.status(200).send(await Song.findAll());
//   } catch (err) {
//     next(err)
//   }
// })

router.get("/:id", async (req, res, next) => {
  try {
    //req.params.id = parseInt(req.params.id)
    res.status(200).send(
      await Song.findAll({
        include: [
          {
            model: Vote,
            attributes: ["voteValue"],
          },
        ],
        attributes: ["id", "name", "image", "videoId", "userId", "roomId",'rank'],
        where: {
          roomId: req.params.id,
        },
        order: [["id"]],
      })
    );
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const song = await Song.create(req.body);
    song.roomId = req.params.id;
    await song.save();
    res.status(201).send(await Song.findAll());
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const song = await Song.findOne({
      where: {
        id: req.params.id,
      },
    });
    await song.destroy();
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const topSongs = await Song.findAll({
      where:{
        rank:{
          [Op.gt]: 0
        }
      }
    })
    topSongs.forEach(async song=>{
      if(song.rank===2)song.rank=1
      if(song.rank===3)song.rank=2
      await song.save()
    })
    const song = await Song.findOne({
      where: {
        id: req.params.id,
      },
    });
    song.rank=3
    await song.save()
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
})
