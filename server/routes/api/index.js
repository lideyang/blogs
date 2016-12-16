/**
 * Created by Lidy on 2016/12/12.
 */
var express = require('express'),
    account = require("./account"),
    archive = require("./article"),
    article = require("./article"),
    comment = require("./comment"),
    search = require("./search"),
    tag = require("./tag"),
    link = require("./link");
var router = express.Router();
module.exports = {account, archive, article, comment, search, tag, link};