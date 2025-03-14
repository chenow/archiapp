var express = require("express");
var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function (req, res) {
  res.send("Hello");
});

app.get("/test/*", function (req, res) {
  const path = req.url.substring(6); // 6 est la longueur de "/test/"
  res.json({ msg: path });
});

let counter = 0;

app.get("/cpt/query", function (req, res) {
  res.json({ value: counter });
});

app.get("/cpt/inc", function (req, res) {
  let value = req.query.v;
  if (value == undefined) {
    counter++;
    res.json({ code: 0 });
  } else {
    // Vérifier si la valeur est un entier
    if (value.match(/^-?\d+$/)) {
      counter += parseInt(value, 10);
      res.json({ code: 0 });
    } else {
      res.json({ code: -1 });
    }
  }
});

var allMsgs = [
  { msg: "Hello World", pseudo: "Alex", createdAt: new Date() },
  { msg: "Bonjour le monde", pseudo: "Jean", createdAt: new Date() },
  {
    msg: "CentraleSupelec Forever",
    pseudo: "Charles",
    createdAt: new Date(),
  },
];

// Route pour ajouter un message
app.get("/msg/post/*", function (req, res) {
  var message = unescape(req.url.substring(10));
  const pseudo = "Moi";
  const createdAt = new Date();
  allMsgs.push({ msg: message, pseudo: pseudo, createdAt: createdAt });
  res.json({ code: 0, index: allMsgs.length - 1 });
});

// Route pour récupérer un message par son numéro
app.get("/msg/get/*", function (req, res) {
  var index = parseInt(req.url.substring(9), 10);
  if (!isNaN(index) && index >= 0 && index < allMsgs.length) {
    res.json({ code: 1, msg: allMsgs[index] });
  } else {
    res.json({ code: 0 });
  }
});

// Route pour récupérer tous les messages
app.get("/msg/getAll", function (req, res) {
  res.json(allMsgs);
});

// Route pour récupérer le nombre de messages
app.get("/msg/nber", function (req, res) {
  res.json(allMsgs.length);
});

// Route pour effacer un message
app.get("/msg/del/*", function (req, res) {
  var index = parseInt(req.url.substring(9), 10);
  if (!isNaN(index) && index >= 0 && index < allMsgs.length) {
    allMsgs.splice(index, 1);
    res.json({ code: 0 });
  } else {
    res.json({ code: -1 });
  }
});

app.listen(8080);
console.log("App listening on port 8080...");
