import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const { jwtToken } = req.cookies;
  //   console.log(token);

  if (!jwtToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = jwt.verify(jwtToken, "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }

  next();
};
export default jwtAuth;
