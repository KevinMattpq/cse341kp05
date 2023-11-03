require('.dotenv').config()
const express = require('express');
const router = express.Router();
const cars = require('./cars');
const buyers = require('./buyers');

router.use(auth(config));
const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: '{yourClientId}',
    issuerBaseURL: 'https://{yourDomain}',
    secret: 'LONG_RANDOM_STRING'
  };

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