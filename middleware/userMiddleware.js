const jwt = require('jsonwebtoken');

// let {token, secretKey} = require("../controller/userController")
exports.sign = (payload, secretkey) => {
    const token = jwt.sign(payload, secretkey);
    return token;
}
exports.verifyUser = (req, res, next) => {
      const token = req.headers.token;
      const secretKey = req.headers.secretkey;
        try{
            jwt.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    console.log(typeof(token) , typeof(secretKey))
                    res.status(500).send("JWT authentication failed");
                     
                }
                else {
                    // res.status(200).send("JWT authentized");
               
                    next()

                }
            })
        }
        catch(err){
            console.log(err);
        }
        
    }
   
    
