const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const recipesRouter = require("./routes/recipes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/recipes", recipesRouter);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
