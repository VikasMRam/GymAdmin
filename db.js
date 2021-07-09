const mongoose = require("mongoose");

class DataBaseManagment {
  constructor() {
    this.db = "";
  }

  static establishConnection() {
    console.log("In Db 1");
    return new Promise((resolve, reject) => {
      // mongodb+srv://admin:<password>@cluster0.dfyku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
      mongoose.connect(
        "mongodb+srv://admin:admin1234@cluster0.dfyku.mongodb.net/gym_admin?retryWrites=true&w=majority",
        { useNewUrlParser: true },
        (err, db) => {
          console.log("In Db 2");
          // console.log(db)
          console.log(err);
          this.db = db;
          var collection = db.collection("user");
          // console.log(collection);
          console.log("connected to DB");
          resolve(true);
        }
      );
    });
  }

  static closeConnection() {
    mongoose.connection.close();
  }

  static getDb() {
    return this.db;
  }
}

module.exports = DataBaseManagment;
