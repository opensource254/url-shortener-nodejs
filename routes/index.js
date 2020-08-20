const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const validUrl = require('valid-url');
const shortCode = require('../middleware/uniqueCode');
const cache = require('../services/cache');
// const redis =
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({ msg: 'Its home' });
});
//check if the the url is in db theredirect the user
router.get('/api/item/:code', async (req, res) => {
    const code = req.params.code;
    const item = await Url.findOneAndUpdate(
        { urlCode: code },
        { $inc: { clickCount: 1 } },
        { new: true },
        (err, doc) => {
            if (err) {
                console.log('Something wrong when updating data!',err);
            }

            console.log('updated content',doc);
        }
    );
    //console.log(item);
    //add the clicks theoriticaly

    //redirects
    if (item) {
        res.redirect(item.originalUrl);
    } else {
        res.redirect('/error');
    }
});
//create a short url and record the number of clicks
router.post('/api/item', async (req, res) => {
    const { shortBaseUrl, originalUrl } = req.body;
    // console.log(req.body)
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
        return res.status(404).json('Invalid Base Url format');
    }
    //the url we want to find
    const data = { originalUrl };
    //try catch block
    if (validUrl.isUri(originalUrl)) {
        let urlInfo;
        try {
            // get the url from cache
            urlInfo = await cache.getFromCache('orginalUrl', JSON.stringify(data));
            console.log('from cache', urlInfo);
            if (!urlInfo) {
                urlInfo = await Url.findOne(data).exec();

                console.log('from db', urlInfo);
            }

            if (urlInfo) {
                console.log(data);
                res.status(200).json(data);
            } else {
                const urlCode = shortCode.generate();

                shortUrl = shortBaseUrl + '/' + urlCode;
                //create an object to save
                const item = { originalUrl, shortUrl, urlCode, clickCount: 0 };

                //create new object
                const newUrl = new Url(item);

                //save to mongodb
                console.log(newUrl);
                await newUrl.save((err) => {
                    if (err) {
                        console.log('Error in saving the url', err);
                        // throw err;
                        res.json('Error occured ');
                    }
                });
                //add to cache
                cache.addToCache('originalUrl', JSON.stringify(data), newUrl);
                res.status(200).json(newUrl);
            }
        } catch (error) {
            console.log(error);
            res.status(401).json('Invalid User Id');
        }
    } else {
        return res.status(401).json('Invalid Original Url.');
    }
});
router.get('/error', (req, res) => {
    res.send({ msg: 'We couldnt find the url' });
});
module.exports = router;
