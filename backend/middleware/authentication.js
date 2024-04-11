const jwt = require('jsonwebtoken');

const authentication = (req,res,next) =>{
    try{
        const token = req.header("auth-token")
        if(!token){
            res.status(401).send('Access Denied')
        }
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user
        next();
    }catch{
        res.status(400).send('Invalid Token')
    }


}

module.exports = authentication;