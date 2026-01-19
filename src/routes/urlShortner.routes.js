const express = require("express");
const { generateShortUrl, getRedirectPageFromShortId, getAnalyticsByShortId, getAllUrls } = require("../controllers.js/url.controllers")

const router = express.Router();

router.get("/analytics/:shortId", getAnalyticsByShortId);
router.get("/all", getAllUrls);
router.get("/:shortId", getRedirectPageFromShortId);
router.post("/", generateShortUrl);



module.exports = { urlRoutes: router }