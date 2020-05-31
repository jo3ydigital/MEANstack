const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../models/User');

// Create User
userRoute.route('/create').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Users
userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({ name: 1 })
})

// Get single User
userRoute.route('/read/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update User
userRoute.route('/update/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete User
userRoute.route('/delete/:id').delete((req, res, next) => {
  User.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Search by field
//userRoute.route('/search/:field:terms').post((req, res, next) => {
userRoute.route('/search').post((req, res, next) => {
  let param_field = req.body.sField;
  let param_terms = req.body.sterms;

  stringSearch = function() {
    User.find( {[param_field]: new RegExp(param_terms, 'i')}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({ name: 1 })
  }

  numSearch = function() {
    User.find( { $where: 'this.'+param_field+'.toString().match('+param_terms+')'}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  }

  returnAllUsers = function() {
    User.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({ name: 1 })
  }

  // If no search terms entered, show everyone
  if (param_terms === null) {
    returnAllUsers();
  } else {
    switch(param_field) {
      case 'phoneNumber': numSearch(); break;
      default: stringSearch();
    }
  }

})

module.exports = userRoute;