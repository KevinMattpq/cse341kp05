const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



const getAllBuyers = async(req, res, next) => {
  const result = await mongodb.getDb().db().collection('buyers').find();
  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
  });
};

const getSingleBuyer = async (req, res, next) => {
    try {
      const buyersId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('buyers')
        .findOne({ _id: buyersId });
      if (result) {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(result);
      } else {
        res.status(400).json({ error: 'No buyer found' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'server error' });
    }
  };

  // New Functions Personal 07
  const createBuyer = async (req, res, next) =>{
     const newBuyer = {
      buyerName: req.body.buyerName,
      buyerLastname: req.body.buyerLastname,
      buyerAge: req.body.buyerAge,
      buyerAnnualIncome: req.body.buyerAnnualIncome,
      buyerCreditScore: req.body.buyerCreditScore
     }
      const result = await mongodb.getDb().db().collection('buyers').insertOne(newBuyer)
      if (result){
        res.setHeader('Content-type', 'application/json');
        res.status(201).json(result);
      }else{
        console.log("Error")
      }
  }

  const updateBuyer = async (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json('Must use a valid buyer Id to update buyer');
    }
    const buyerId = new ObjectId(req.params.id)
    const updatedBuyer = {
        buyerName: req.body.buyerName,
        buyerLastname: req.body.buyerLastname,
        buyerAge: req.body.buyerAge,
        buyerAnnualIncome: req.body.buyerAnnualIncome,
        buyerCreditScore: req.body.buyerCreditScore
    };
    const result = await mongodb.getDb().db().collection('buyers').replaceOne({_id: buyerId},updatedBuyer);
    if (result.modifiedCount > 0){
      res.status(204).send(result);
    }else{
      res.status(400).json(response.error || 'Some error ocurred while updating the buyer information');
    }
    };
  
    const deleteBuyer = async (req, res) =>{
      if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid buyer id to delete a buyer.');
      }
  
      const buyerId = new ObjectId(req.params.id)
      const result = await mongodb.getDb().db().collection('buyers').deleteOne({_id: buyerId});
      if (result){
        res.setHeader('Content-type', 'application/json');
        res.status(200).send(result);
      }else{
        res.status(400).json(response.error || 'Some error ocurred while deleting the buyer');
      }
    }

module.exports = { getAllBuyers, getSingleBuyer, createBuyer, updateBuyer, deleteBuyer };

