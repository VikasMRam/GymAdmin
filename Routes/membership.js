const express = require("express");
const router = express.Router();

const membershipModel = require("../Models/membership");

const Db = require("../db");

router.post("/createMembership", (req, res) => {
  const membershipmodel = new membershipModel({
    planId: req.body.planId,
    totalAmount: req.body.totalAmount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    amountPaid: req.body.amountPaid,
    userId: req.body.userId,
  });
  membershipmodel["membershipId"] = membershipmodel["_id"];
  membershipmodel
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getMembershipById", (req, res) => {
  let membershipId = req.query.membershipId;
  let db = Db.db;
  db.collection("memberships")
    .findOne({ membershipId: membershipId })
    .then((response) => {
      res.json(response);
    });
});

router.post("/updateMembership", (req, res) => {
  const membershipModel = {
    planId: req.body.planId,
    totalAmount: req.body.totalAmount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    amountPaid: req.body.amountPaid,
    userId: req.body.userId,
  };
  let membershipId = req["body"]["membershipId"];
  let db = Db.db;
  db.collection("memberships")
    .updateOne(
      { membershipId: membershipId },
      { $set: membershipModel },
      { upsert: false }
    )
    .then((response) => {
      res.json(response);
    });
});

router.get("/getAllMemberships", (req, res) => {
  let db = Db.db;
  // db.collection("memberships")
  //   .find()
  //   .toArray()
  //   .then((response) => {
  //     res.json(response);
  //   });

  db.collection("memberships")
  .aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "userId",
        as: "userDetails",
      },
    },
  ])
  .toArray()
  .then((response) => {
    res.json(response);
  });


});

module.exports = router;
