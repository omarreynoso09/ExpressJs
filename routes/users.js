var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/myname", function (req, res, next) {
  res.send("Hansel Reynoso");
});

router.get("/myfavoritemovies", function (req, res, next) {
  res.json(["King kong", "Spider Man ", "Troy"]);
});

module.exports = router;
