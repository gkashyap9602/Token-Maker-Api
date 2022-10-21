const express = require("express");
const Routes = require("./v1/routes/index");
const router = express();
router.use("/compile", Routes.userRoutes);
module.exports = router;
