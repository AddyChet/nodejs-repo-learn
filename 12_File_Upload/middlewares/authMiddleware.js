import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Access Denied! No token provided. Please login to proceed!",
    });
  }

  //decode token
  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRETKEY)
    req.userInfo = decodedToken
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
 
};


export const isAdminUser = (req,res,next) => {
    if(req.userInfo.role !== "admin") {
        return res.status(403).json({
            success : false,
            message : "Access Denied! Admin Rights Required!"
        })
    }
    next()
}