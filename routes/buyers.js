const express = require("express");
const router = express.Router();
const buyersFromControllers = require('../controllers/buyers');

// Importing validations
const validation = require('../middleware/validation');
// Here I will call the Functions from contacts inside the Controllers Folder

router.get('/', buyersFromControllers.getAllBuyers);
router.get('/:id',buyersFromControllers.getSingleBuyer);

// Personal Assignment 07
router.post('/',validation.saveBuyer, buyersFromControllers.createBuyer);
// Adding Validations
router.put('/:id',validation.saveBuyer, buyersFromControllers.updateBuyer);
router.delete('/:id',validation.saveBuyer, buyersFromControllers.deleteBuyer);

module.exports = router;