const jwt = require('jsonwebtoken');
const JWT_SECRET ='Anshuiscute';
const fetchuser= (req, res,next)=>{
//Get the user from the jwt token and add id ot req object
const token = req.header('auth-token');
if(!token)
{
     res.status(401).send({error:"Access Denied "});
}
try
{
    const data = jwt.verify(token, JWT_SECRET);
    req.user= data.user;
    next();
}
catch(error)
{
    res.status(401).send({error:"please authenticate using a valid token"})
}
}
module.exports= fetchuser;