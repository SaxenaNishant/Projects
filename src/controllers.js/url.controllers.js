const shortid = require('shortid');
const { UrlShortner } = require("../model/url.schema");

const generateShortUrl = async (req, res) => {
    const { redirectUrl } = req.body;
    if(!redirectUrl) res.status(400).json("URL is required!!!")
    const parsedUrl = new URL(redirectUrl)
    if (!parsedUrl.origin){
        return res.status(400).json("Invalid Url!!!")
    }
    const shortId = shortid.generate();

    await UrlShortner.create({
        shortId,
        redirectUrl,
        createdBy: req.user?._id
    });
    
    res.render("home", {
        id: shortId
    })
}

const getRedirectPageFromShortId = async (req, res) => {
    const { shortId } = req.params;
    if(!shortId) return res.status(400).json("ShortId is required");
    const urlInfo = await UrlShortner.findOneAndUpdate({shortId}, {
            $push: {
                visitHistory: {
                    timestamp:new Date()
                }
            }
    });
    if(!urlInfo){
        return res.status(404).json("ShortId is not found");
    }

    return res.redirect(urlInfo.redirectUrl)
}

const getAnalyticsByShortId = async (req, res) => {
    const { shortId } = req.params;
    if(!shortId) return res.status(400).json("ShortId is required");
    const urls = await UrlShortner.findOne({ shortId });

    return res.status(200).json({ totalClicks: urls.visitHistory.length, analytics: urls.visitHistory })
}

const getAllUrls = async (req, res) => {
    const urls = await UrlShortner.find({});
    res.render("home", {
        urls
    })    
}

module.exports = { generateShortUrl, getRedirectPageFromShortId, getAnalyticsByShortId, getAllUrls }

