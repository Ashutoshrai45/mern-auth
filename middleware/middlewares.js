import jwt from "jsonwebtoken";

export const Errormiddleware = (err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const errMessage = err.message || "Internal server error";
  return res.status(statuscode).json({
    success: false,
    errMessage,
    statuscode,
  });
};

export const Errorhandler = (status, message) => {
  const error = new Error();
  error.statusCode = status;

  error.message = message;
  return error;
};

export const Verifyuser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) next(Errorhandler(401, "Ypu need to be login"));

  jwt.verify(token, "ashutoshrai", (err, user) => {
    if (err) return Errorhandler(403, "token is not valid");

    req.user = user;
    next();
  });
};
