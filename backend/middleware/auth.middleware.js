const userModel=require('../model/userModel')
const captainModel=require('../model/captain.model')
const blacklistTokenModel=require('../model/blacklist.Token.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

module.exports.authUser= async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    const isBlacklisted= await blacklistTokenModel.findOne({token:token});
    if (isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECERET);
        const user= await userModel.findById(decoded._id);
        req.user=user;
        return next();

    } catch(error){
        return res.status(401).json({message:'Unauthorized'});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECERET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}