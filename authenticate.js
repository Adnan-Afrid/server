var User = require('./models/user');
var jwt = require('jsonwebtoken'); //importing jsonwebtoken node module that we installed
var tokenInfo = require('./tokenInfo');
var config = require('./config');

function authVerifyUser(req, res, next){
    console.log(req.headers)
    const authHeader = req.headers["authorization"];
    console.log(authHeader, "SEE THIS");
    const token = authHeader && authHeader.split(" ")[1];

    console.log("token", token);
    jwt.verify(token, "12345-67890-09876-54321", (err, decoded)=>{
        console.log(err);
        if(err)
        return res.sendStatus(403);
        req.decoded = decoded;
        next();
    });
}
// function authVerifyAdmin(req, res, next){
//     const authHeader = req.headers["authorization"];
//     console.log(authHeader, "SEE THIS");
//     const token = authHeader && authHeader.split(" ")[1];

//     console.log("token", token);
//     jwt.verify(token, "12345-67890-09876-54321", (err, decoded)=>{
//         console.log(err);
//         if(err)
//         return res.sendStatus(403);
//         else if(req.user.admin === true){
//            req.decoded = decoded;
// 		  next();
//         }
// 	else{
// 	  var err = new Error('You are not authorized to perform this operation!');                         
//       err.status = 403;
//        next(err);
// 	}
//     });
// }
module.exports = authVerifyUser;