const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Tourguides = require('../models/tourGuide');
const { response } = require('express');

const tourGuideRouter = express.Router();
tourGuideRouter.use(bodyParser.json());


tourGuideRouter.route('/')
.get((req, res, next) =>{
  Tourguides.find({})
  .then((tourguides) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(tourguides)
  },(err) => next(err))
  .catch((err) => next(err))
})
.post((req, res, next)=>{
  Tourguides.create(req.body)
  .then((Tourguide) =>{
    console.log('Tour Guide Profile Created ', Tourguide);
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(Tourguide);
  },(err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) =>{
  res.statusCode = 403;
  res.end('PUT operation is not supported for /tourGuide');
})
.delete((req, res, next) =>{
  Tourguides.remove({})
  .then((response) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(response);
  },(err)=> next(err))
  .catch((err) =>next(err));
});

tourGuideRouter.route('/:tourGuideId')
.get((req, res, next)=>{
  Tourguides.findById(req.params.tourGuideId)
  .then((tourguides) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(tourguides);
  },(err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) =>{
  res.statusCode = 403;
  res.end('POST operation not supported on /tourGuideId');
})
.put((req, res, next) =>{
  Tourguides.findByIdAndUpdate(req.params.tourGuideId, {
    $set: req.body
}, { new: true })
  .then((tourguide) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(tourguide);
  },(err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) =>{
  Tourguides.findByIdAndRemove(req.params.tourGuideId)
  .then((tourguide)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(tourguide)
  },(err)=> next(err))
  .catch((err) => next(err));
})
module.exports = tourGuideRouter;