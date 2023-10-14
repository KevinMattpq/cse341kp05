const express = require("express");
const router = express.Router();
const carsFromControllers = require('../controllers/cars');

// Here I will call the Functions from contacts inside the Controllers Folder

router.get('/', carsFromControllers.getAllCars);
router.get('/:id',carsFromControllers.getSingleCar);

// Personal Assignment 03
router.post('/', carsFromControllers.createCar);
router.put('/:id', carsFromControllers.updateCar);
router.delete('/:id', carsFromControllers.deleteCar);

module.exports = router;