const express = require("express");
const router = express.Router();
const userModel = require("../Models/user");

const Db = require("../db");

router.post("/createuser", (req, res) => {
  const usermodel = new userModel({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    lastName: req.body.lastName,
    phone: req.body.phone,
    gender: req.body.gender,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
    additionalDetails: req.body.additionalDetails,
    membershipDetails: req.body.membershipDetails,
    dob: req.body.dob,
  });
  usermodel["userId"] = usermodel["_id"];
  usermodel
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        res.status(400).send({
          message: "User exists",
        });
      }
      res.status(500).send({
        message: "Server error",
      });
    });
});

router.get("/getUserById", (req, res) => {
  let userId = req.query.userId;
  let db = Db.db;
  db.collection("users")
    .findOne({ userId: userId })
    .then((response) => {
      db.collection("memberships")
        .find({ userId: userId })
        .toArray()
        .then((membershipResponse) => {
          if (membershipResponse) {
            response["membershipDetails"] = membershipResponse;
          }
          res.json(response);
        });
      // console.log(response)
      // res.json(response);
    });
});

router.post("/updateUser", (req, res) => {
  const usermodel = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    gender: req.body.gender,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
    additionalDetails: req.body.additionalDetails,
    email: req.body.email,
    membershipDetails: req.body.membershipDetails,
    dob: req.body.dob,
  };
  let userId = req["body"]["userId"];
  let db = Db.db;
  db.collection("users")
    .updateOne({ userId: userId }, { $set: usermodel }, { upsert: false })
    .then((response) => {
      res.json(response);
    });
});

router.get("/getAllUsers", (req, res) => {
  let db = Db.db;
  // db.collection("users")
  //   .find()
  //   .toArray()
  //   .then((response) => {
  //     res.json(response);
  //   });

  db.collection("users")
    .aggregate([
      {
        $lookup: {
          from: "memberships",
          localField: "userId",
          foreignField: "userId",
          as: "membershipDetails",
        },
      },
    ])
    .toArray()
    .then((response) => {
      res.json(response);
    });
});

module.exports = router;
