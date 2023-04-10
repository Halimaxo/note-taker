const express = require("express");

const dbFile = require("./db/db.json");

const path = require("path");

const app = express();

const PORT = 3001;

const fs = require("fs");

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(dbFile);
});

app.post("/api/notes", (req, res) => {
  console.log(dbFile);
  const { title, text } = req.body;
  dbFile.push(req.body);
  console.log(dbFile);
  fs.writeFileSync("./db/db.json", JSON.stringify(dbFile));
  res.status(201).json(dbFile);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
