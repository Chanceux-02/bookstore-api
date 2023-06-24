const jwt = require('jsonwebtoken');

module.exports =  async(req, res, next)=>{
    const authToken = req.headers.authorization;

        if(authToken === undefined){
                return res.status(401).json({message: "No token found!"});
            }
            
        const token = await authToken.split(' ')[1];
        await jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
            // Attach the decoded user information to the request object
            req.user = decoded;
            console.log('decoded');
            next();
        });
 }