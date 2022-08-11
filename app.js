const express = require("express");
const bodyParser = require("body-parser");
const { request } = require("express");
const date = require(__dirname + "/date.js");

const app = express();

const listItems = [];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    listItems: listItems,
  });
});

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    listItems: workItems,
  });
});

app.post("/", (req, res) => {
  if (req.body.listSubmit === "Work") {
    workItems.push(req.body.newTodo);
    res.redirect("/work");
  } else {
    listItems.push(req.body.newTodo);
    res.redirect("/");
  }
});

app.post("/deleteItems", (req, res) => {
  const toDelete = req.body.items;
  if (toDelete.length == 0) {
    res
      .status(404)
      .json({ status: "Error", message: "items não selecionados" });
    return;
  }
  console.log(`items na lista: ${listItems}`);
  const start = toDelete[0];
  const range = toDelete.length;
  listItems.splice(start, range);
  res.status(200).json({ status: "Success" });
  console.log(`apagou com sucesso os items ${toDelete}`);
  console.log(`items na lista: ${listItems}`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000.");
});
