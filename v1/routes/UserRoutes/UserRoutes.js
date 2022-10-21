const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/index");

router.post(
  "/contract",Controller.UserController.CreateAndCompile);
router.get(
  "/hello",Controller.UserController.getdata);

module.exports = router;
