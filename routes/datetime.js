var express = require("express");
var router = express.Router();

/*  home page. */
router.get("/", function (req, res, next) {
  res.send(new Date());
});

module.exports = router;
