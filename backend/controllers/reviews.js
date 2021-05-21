const { response } = require("express");

const TownReview = require("../models/TownReview");

const getLatestReviews = async (req, res = response) => {
  try {
    const latestReviews = await TownReview.find()
      .sort({ creation_date: -1 })
      .limit(3)
      .populate([
        { path: "user", select: ["username", "avatar"] },
        { path: "town", select: ["name", "state", "rate", "description"] },
      ]);

    res.status(201).json(latestReviews);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Please talk to the System Manager" });
  }
};

const getUserReviews = async (req, res = response) => {
  const { id } = req.params;
  const { uid } = req;

  try {
    if (id !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes los privilegios para agregar el registro",
      });
    }

    const userReviews = await TownReview.find({ user: id }).populate({
      path: "town",
      select: ["name"],
    });
    res.status(201).json(userReviews);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Please talk to the System Manager" });
  }
};

const addReview = async (req, res = response) => {
  const { id } = req.params;
  const { uid } = req;

  try {
    if (id !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes los privilegios para agregar el registro",
      });
    }

    review = new TownReview({
      user: id,
      ...req.body,
      creation_date: new Date().toLocaleString(),
    });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Please talk to the System Manager" });
  }
};

module.exports = { getLatestReviews, getUserReviews, addReview };
