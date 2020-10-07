const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// ===========================================================
//notes page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "public/notes.html"));
});

//notes data
app.get("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "..", "db/db.json"),"utf-8",(err,data) => {
    if(err) console.log(err);
    res.json(JSON.parse(data));
  })
});

//default page
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
