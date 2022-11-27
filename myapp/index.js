const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;
let numsArray = require("./array");

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("App is listening on port 3000");
});

app.get("/home", (req, res) => {
  res.json(numsArray);
});

app.post("/postNew", (req, res) => {
  const { name, url } = req.body;
  numsArray.hardData.push([name, url]);
  console.log("POST REQUEST RECEIVED");
  res.json(numsArray);
});

app.post("/delete", (req, res) => {
  const { deleteID } = req.body;
  numsArray.hardData.splice(deleteID, 1);
  console.log("DELETE REQUEST RECEIVED");
  res.json(numsArray);
});

app.post("/update", (req, res) => {
  const { newBKTitle, newBKLink, changeIndex } = req.body;
  numsArray.hardData[changeIndex][0] = newBKTitle;
  numsArray.hardData[changeIndex][1] = newBKLink;
  console.log("UPDATE REQUEST RECEIVED");
  res.json(numsArray);
});
