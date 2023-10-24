const express = require("express");
const router = express.Router();
const carsFromControllers = require('../controllers/cars');

// Importing validations
const validation = require('../middleware/validation');
// Here I will call the Functions from contacts inside the Controllers Folder

router.get('/', carsFromControllers.getAllCars);
router.get('/:id',carsFromControllers.getSingleCar);

// Personal Assignment 
router.post('/', carsFromControllers.createCar);
// Adding Validations
router.put('/:id',validation.saveCar, carsFromControllers.updateCar);
router.delete('/:id',validation.saveCar, carsFromControllers.deleteCar);

module.exports = router;