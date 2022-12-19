const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const recipiesRouter = require("./routes/allRecipies.js");
const getARecepiRouter = require("./routes/getRecipi.js");
const postRecipiRouter = require("./routes/postRecipi.js");
const deleteRecipiRouter = require("./routes/deleteRecipi.js");
const updateRecipeRouter = require("./routes/updateRecipi.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//app.get('/',(req,res)=>{
//	res.send("hello world");
//});

app.use("/api/recipies", recipiesRouter);
app.use("/api/recipies", getARecepiRouter);
app.use("/api/recipies", postRecipiRouter);
app.use("/api/recipies", deleteRecipiRouter);
app.use("/api/recipies", updateRecipeRouter);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
