const express = require("express");
const router = express.Router();
const planModel = require("../Models/plan");

const Db = require("../db");

router.post("/createPlan", (req, res) => {
  const planmodel = new planModel({
    planName: req.body.planName,
    planPrice: req.body.planPrice,
    duration: req.body.duration,
    description: req.body.description,
    active: true,
  });
  planmodel["planId"] = planmodel["_id"];
  console.log();
  planmodel
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getPlanById", (req, res) => {
  let planId = req.query.planId;
  let db = Db.db;
  db.collection("plans")
    .findOne({ planId: planId })
    .then((response) => {
      res.json(response);
    });
});
router.get("/getAllPlans", (req, res) => {
  let db = Db.db;
  db.collection("plans")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
router.post("/updatePlan", (req, res) => {
  const planmodel = {
    planName: req.body.planName,
    planPrice: req.body.planPrice,
    duration: req.body.duration,
    description: req.body.description,
    active: req.body.active,
  };
  let planId = req["body"]["planId"];
  let db = Db.db;
  db.collection("plans")
    .updateOne({ planId: planId }, { $set: planmodel }, { upsert: false })
    .then((response) => {
      res.json(response);
    });
});

module.exports = router;
