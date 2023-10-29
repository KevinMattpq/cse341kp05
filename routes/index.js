const express = require('express');
const router = express.Router();
const cars = require('./cars');
const buyers = require('./buyers');

router.use['/',require('./swagger')]
router.use('/cars', cars);
router.use('/buyers',buyers)
router.use(
    '/',
    (docData = (req, res) =>{
    let docData = {
        documentationURL: 'https://github.com/KevinMattpq/cse341kp05',
    };
    res.send(docData);
    })
)

router.use('/cars', require('./cars'));
router.use('/buyers',require('./buyers'))

module.exports = router;