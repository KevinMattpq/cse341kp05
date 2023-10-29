const validator = require('../helpers/validate');
const saveCar = (req, res, next) => {
    const validationRule = {
    // EXAMPLE CAR:
    //   carBrand: req.body.carBrand,
    //   carModel: req.body.carModel,
    //   carColor: req.body.carColor,
    //   carTopSpeed: req.body.carTopSpeed,
    //   carYear: req.body.carYear
      carBrand: 'required|string',
      carModel: 'required|string',
      carColor: 'required|string',
      carTopSpeed: 'required|string',
      carYear: 'string',
      carPrice: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveBuyer = (req, res, next) => {
    const validationBuyer = {
      buyerName: 'required|string',
      buyerLastname: 'required|string',
      buyerAge: 'required|string',
      buyerAnnualIncome: 'required|string',
      buyerCreditScore: 'required|string'
    };
    validator(req.body, validationBuyer, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  

  module.exports = {
    saveCar,saveBuyer
  };