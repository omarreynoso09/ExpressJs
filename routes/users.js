var express = require("express");
var router = express.Router();

let favMoviesArr = ["Gods", "Moon", "HandFive"];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("users", { title: "Users" });
});

router.get("/myname", function (req, res) {
  res.send("Hansel Reynoso");
});

router.get("/myfavoritemovies", function (req, res) {
  res.json(favMoviesArr);
});

module.exports = router;
