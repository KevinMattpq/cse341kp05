const mongodb = require('../db/connect');
const{ObjectId}  = require('mongodb');



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
        res.status(400).json({ error: 'No Car found' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'server error' });
    }
  };

  // New Functions Personal 
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
    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json('Must use a valid car Id to update contact');
    }
    const updatedCar = {
      carBrand: req.body.carBrand,
      carModel: req.body.carModel,
      carColor: req.body.carColor,
      carTopSpeed: req.body.carTopSpeed,
      carYear: req.body.carYear
    };
    const carId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('cars').replaceOne({_id: carId},updatedCar);
    if (result.modifiedCount > 0){
      res.setHeader('Content-type', 'application/json');
      res.status(204).send(result);
    }else{
      res.status(400).json(response.error || 'Some error ocurred while updating the car information');
    }
    }
  
    const deleteCar = async (req, res) =>{
      if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid Car id to delete a car.');
      }
  
      const carId = new ObjectId(req.params.id)
      const result = await mongodb.getDb().db().collection('cars').deleteOne({_id: carId});
      if (result){
        res.setHeader('Content-type', 'application/json');
        res.status(200).send(result);
      }else{
        res.status(400).json(response.error || 'Some error ocurred while deleting the contact');
      }
    }
  // const deleteCar = async (req, res, next) =>{
  //   const carId = new ObjectId(req.params.id)
  //   const result = await mongodb.getDb().db().collection('cars').deleteOne({_id: carId});
  //   if (result){
  //     res.setHeader('Content-type', 'application/json');
  //     res.status(200).json(result);
  //   }else{
  //     console.log("Error")
  //   }
  // }

module.exports = { getAllCars, getSingleCar, createCar, updateCar, deleteCar };

