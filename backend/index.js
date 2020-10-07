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

//add note
app.post("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "..", "db/db.json"),"utf-8",(err,data) => {
    if(err) throw err;
    
    let obj = JSON.parse(data);
    let note = req.body;
    note.id = getID();
    obj.push(note);
    // data=JSON.stringify(obj);
    fs.writeFile(path.join(__dirname, "..", "db/db.json"), JSON.stringify(obj), "utf-8", (err) => {
      if(err) console.log(err);
    });
    res.send(true);
  })
});

//extremely unlikely to return a duplicate value under any real scenario
const getID = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
