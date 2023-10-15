const mongodb = require('../db/connect');
const{ObjectId}  = require('mongodb');
const { param } = require('../routes');


const getAllCars = async(req, res, next) => {
    const result = await mongodb.getDb().db().collection('cars').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingleCar = async (req, res, next) => {
    try {
      const carsId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('cars')
        .findOne({ _id: carsId });
      if (result) {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(result);
      } else {
        res.status(200).json({ error: 'No Car found' });
      }
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'server error' });
    }
  };

  // New Functions Personal Assignment 03
  const createCar = async (req, res, next) =>{
     const newCar = {
      carBrand: req.body.carBrand,
      carModel: req.body.carModel,
      carColor: req.body.carColor,
      carTopSpeed: req.body.carTopSpeed,
      carYear: req.body.carYear
     }
      const result = await mongodb.getDb().db().collection('cars').insertOne(newCar)
      if (result){
        res.setHeader('Content-type', 'application/json');
        res.status(201).json(result);
      }else{
        console.log("Error")
      }
  }

  const updateCar = async (req, res, next) => {
    const updatedCar = {
      carBrand: req.body.carBrand,
      carModel: req.body.carModel,
      carColor: req.body.carColor,
      carTopSpeed: req.body.carTopSpeed,
      carYear: req.body.carYear
    }
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('cars').replaceOne({_id: userId},updatedCar);
    if (result){
      res.setHeader('Content-type', 'application/json');
      res.status(204).json(result);
    }else{
      console.log("Error")
    }
    }
  
  const deleteCar = async (req, res, next) =>{
    const carId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('cars').deleteOne({_id: carId});
    if (result){
      res.setHeader('Content-type', 'application/json');
      res.status(200).json(result);
    }else{
      console.log("Error")
    }
  }

module.exports = { getAllCars, getSingleCar, createCar, updateCar, deleteCar };
