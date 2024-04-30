// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).send("there is some error :(");
      res.id = user.id;
      next();
    });
  } else {
    return res.status(403).send("cannot find token in header :(");
  }
}
module.exports = {
  verifyToken,
};
