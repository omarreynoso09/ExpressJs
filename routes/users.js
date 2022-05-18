var express = require("express");
var router = express.Router();
var favMovies = ["SpiderMan", "IronMan", "Troy"];

/* GET users listing. */

// Stretch Goal ***
router.get("/", function (req, res, next) {
  res.render("users", { title: "Users" });
});
// End Of Stretch Goal ***

router.get("/myname", (req, res, next) => {
  res.send("Hansel Reynoso");
});

router.get("/myfavoritemovies", (req, res, next) => {
  res.json(favMovies);
});

module.exports = router;
