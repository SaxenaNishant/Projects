const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    redirectUrl:{
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: [{
        timestamp: Date
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
}, { timestamps:true });

const UrlShortner = mongoose.model('urlShortner', urlSchema)

module.exports = { UrlShortner };

