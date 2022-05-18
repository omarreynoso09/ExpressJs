var express = require("express");
var router = express.Router();
const favFood = ["Mangu", "Seafood", "Steak", "Rice"];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/myname", (req, res) => {
  res.send("Hansel Reynoso");
});

router.get("/myfavoriteFood", (req, res) => {
  res.json(favFood);
});

module.exports = router;
