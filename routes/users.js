var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
const user = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const authVerifyUser = require('../authenticate');


var router = express.Router();
router.use(bodyParser.json()); 

/* GET users listing. */
router.get('/',authVerifyUser, function(req, res, next) {
  User.find({})
  .then((users) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  })
  .catch((err) =>{
  res.statusCode = 500;
  res.setHeader('Content-Type','application/json');
  res.json({err: err});
  });
});

router.post('/signup', async(req, res, next) =>{
  //User.register(new User({username: req.body.username}), req.body.password, (err, user) =>{
  try{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    const user =new User({
      username:req.body.username,
      password:hashPassword,
      
     firstname: req.body.firstname,
     lastname: req.body.lastname,
    });
    const token = jwt.sign({userId: user._id}, "12345-67890-09876-54321",{
      expiresIn: 3600
    });
    console.log(user);
    user.save();
    
   /*if(err){
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json'); 
    res.json({err: err});
   }
   else{*/
     /*if(req.body.firstname)
     user.firstname = req.body.firstname;
     if(req.body.lastname)
     user.lastname = req.body.lastname;
     user.save((err, user) =>{
      if(err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
        return ;
      }*/
      //passport.authenticate('local')(req, res, () =>{
        res.json({
          success:true,
          isAuthenticated: true,
          token: token,
          data: user
        });
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.json({success: true, status: 'Registeration Successful'});
  }catch(err){
    console.log(err);
    };
  });
  

router.post('/login', async(req, res)=>{
  try{
    console.log('Heheheheheheh');
    const user = await User.findOne({username: req.body.username});
    console.log("user here",user)
   if(!user)
    return res.json({
      success:false,
      status: 400,
      Message:"Entered username is invalid"
    })
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    const token = await jwt.sign({userId: user._id}, "12345-67890-09876-54321",{
      expiresIn: 3600
    });
    if(!validPassword)
    return res.json({
      success:false,
      status:400,
      Message:"Password is Wrong "
    })
    
    res.json({
      success:true,
      isAuthenticated: true,
      token: token,
      data: user
    });
  }
  catch(err){
    console.log("jhjhjhjh")
    console.log(err);
    
    };
  
});


router.get('/logout', (req, res, next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Error('You are not logged in');
    err.status = 403;
    next(err);
  }
});
module.exports = router;
