const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({message: 'Access Denied'});

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch{
        res.status(403).json({message :"Invalid token"});
    }
}

//on the basis of roles
function authorize(...roles){
    return(req,res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message : "Access forbidden: role restricted"})
        }
        next();
    }
}

module.exports = {authenticate, authorize};