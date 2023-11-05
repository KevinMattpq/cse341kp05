const { auth, requiresAuth } = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const cars = require('./cars');
const buyers = require('./buyers');
require('dotenv').config()




const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'https://cse-341kp07.onrender.com',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET_KEY
  };

  // auth router attaches /login, /logout, and /callback routes to the baseURL
  router.use(auth(config));
  
  // req.isAuthenticated is provided from the auth router
  router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  });

router.use('/',require('./swagger'));
router.use('/cars',requiresAuth(), cars);
router.use('/buyers',requiresAuth(),buyers)
router.use(
    '/',
    (docData = (req, res) =>{
    let docData = {
        documentationURL: 'https://github.com/KevinMattpq/cse341kp05',
    };
    res.send(docData);
    })
)
module.exports = router;