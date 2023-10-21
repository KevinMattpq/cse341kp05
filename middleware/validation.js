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
      carYear: 'string'
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
  

  module.exports = {
    saveCar
  };