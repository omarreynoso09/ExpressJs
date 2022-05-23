var express = require("express");
const { route } = require("./datetime");
var router = express.Router();

/* home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/datetime", function (req, res, next) {
  res.send(new Date());
});

module.exports = router;
