const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema(
    {
        originalUrl: String,
        shortUrl: String,
        urlCode: String,
        clickCount: Number
    },
    { timestamps: true }
);

module.exports = Url = mongoose.model('Url', urlSchema);
