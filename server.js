const express = require("express");
const bodyParser = require("body-parser");
const serverless = require('serverless-http');
const port = 3100;
const app = express();
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const userRouter = require("./Routes/user");
const planRouter = require("./Routes/plan");
const membershipRouter = require("./Routes/membership");

// const userRouter = require("./Routes/user")
// const uplaod  = require("./services/file-upload")

const databaseManagementClass = require("./db");
console.log('running')
databaseManagementClass.establishConnection();
// const dbObj = new databaseManagementClass();

app.listen(port, function () {
  console.log("listening at ",port);
});
app.get("", function (req, res) {
  return res.status(200).send({ imageurl: "axdx" });
});

// const singleUpload  = uplaod.single('image');
// app.post('/image-upload',function(req,res){

//     singleUpload(req,res,function(err){
//         console.log(req.file.location)
//         // return res.json({'imageurl':req.file.location})
//         return res.status(200).send({'imageurl':req.file.location});
//     })
// })



// const Access_Key_ID = AKIAJA5KSDIBKHJQR4KQ ;

// const Secret_Access_Key = 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;

// Connect To DB

// mongoose.connect("mongodb+srv://Admin:Admin@1234@cluster0-rk8ot.mongodb.net/Tweb?retryWrites=true&w=majority",{useNewUrlParser : true},(err,db)=>{
//     // console.log(db)
//     // console.log(err);
//     var collection = db.collection("users");
//     console.log(collection);
//     console.log("connected to DB")
// })

// app.use('/property', propertyRouter);

// console.log("here")
app.use("/user", userRouter);

app.use("/plan", planRouter);
app.use("/membership", membershipRouter);


module.exports.handler = serverless(app);