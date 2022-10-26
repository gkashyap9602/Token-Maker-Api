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
  res.status(err.statusCode || 400).json({
    message: err.message ? err.message : err,
    statusCode: err.statusCode || 400,
  });
}
