import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  //   console.log(token);

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }

  next();
};
export default jwtAuth;
