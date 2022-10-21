const express = require("express");
const mongoose = require("mongoose");

exports.errCreate = errCreate;
exports.routeErr = routeErr;

function errCreate(req, res, next) {
  req.status = 404;
  const err = new Error("route not found");
  next(err);
}

function routeErr(err, req, res, next) {
  console.log(err, "err");
  if (err.message == "route not found") {
    res.status(404).json({
      message: err.message,
      statusCode: 404,
    });
  }else{
    res.status(400).json({
      message:
        "Check Given Parameters Data Type or Node Module Path For OpenZeppelin Librarry ",
      statusCode: 400,
      error: err.message ? err.message : err,
    });
  }
}
