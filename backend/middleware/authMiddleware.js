import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = expressAsyncHandler( async ( req, res, next ) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(decoded);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
  if ( !token )
  {
    res.status( 401 )
    throw new Error( 'Not authorized, no token' )
  }

} )
export const isAdmin = (req, res, next) => {
  if ( req.user && req.user.isAdmin )
  {
    console.log(req.user)
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};