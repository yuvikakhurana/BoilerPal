import jwt from 'jsonwebtoken';

// Basically create a JWT and then add to cookie for user
const generateJWT = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
       httpOnly: true,
       secure: process.env.NODE_ENV !== 'development',
       sameSite: 'strict',
       maxAge: 30 * 24 * 60 * 60 * 1000 
    });
}

export default generateJWT;