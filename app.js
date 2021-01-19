const express = require("express");
const todos = require("./todos.json");
const morgan = require("morgan");

const app = express();

app.set("view engine", "pug");

function middleWare(req, res, next) {
  let data = new Date(Date.now());

  console.log(`${data} - ${req.method} - ${req.url}`);

  next();
}

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Express ToDo", todos });
});

app.get("/todos", (req, res) => {
  if (req.query.comlited) {
    return res.json(
      todos.filter((todo) => todo.completed.toString() === req.query.comlited)
    );
  }
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  let todo = todos.find((todo) => todo.id == req.params.id);

  if (!todo) return res.status(404).send("Net takoi zadachi");

  res.json(todo);
});

app.listen(3000, () => console.log("Zapyschen!"));
