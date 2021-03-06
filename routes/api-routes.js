const router = require("express").Router();
const Memo = require("../models/Memo");

router.get("/memos", async (req, res) => {
  try {
    const memos = await Memo.find();
    res.status(200);
    res.json(memos);
    res.end();
  } catch (err) {
    res.json(err);
    res.status(500);
    res.send("unexpected server error when retreiving a memo!");
  }
});

router.post("/memos", async (req, res) => {
  try {
    const newMemo = new Memo({
      title: req.body.title,
      content: req.body.content
    });
    const saveMemo = await newMemo.save();
    res.status(201);
    res.json(saveMemo);
    res.end();
  } catch (err) {
    res.json(err);
    res.status(501);
    res.send("Unexpected server error when posting a memo!");
  }
});

router.put("/memos/:id", async (req, res) => {
  try {
    const updateMemo = await Memo.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        content: req.body.content
      },
      { new: true }
    );
    res.status(200);
    res.json(updateMemo);
    res.end();
  } catch (err) {
    res.json(err);
    res.status(501);
    res.send("unexpected server error when updating a memo!");
  }
});

module.exports = router;
