import express from "express";
import swagger from "swagger-ui-express";
import cookieParser from "cookie-parser";
//
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error handler/applicationError.js";
import apidocs from "./swagger.json" assert { type: "json" };
import { connectToDb } from "./src/config/db.js";

import dotenv from "dotenv";
dotenv.config();
//

//Routers
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
//

//

const server = express();
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

//Routes

// server.use(loggerMiddleware);
server.use(express.json());
server.use("/api-docs", swagger.serve, swagger.setup(apidocs));
server.use("/api/users", userRouter);
server.use("/api/posts", jwtAuth, postRouter);
server.use("/api/comments", jwtAuth, commentRouter);
server.use("/api/likes", jwtAuth, likeRouter);
//

//

// Error Handling
server.use((err, req, res, next) => {
  // console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  }
  // server errors.
  res.status(500).send("Something went wrong, please try later");
});

// Handling 404 error

server.use((req, res) => {
  res
    .status(404)
    .send(
      "Api not found. For more information look at our documentation at localhost:3200/api-docs"
    );
});
//

//

server.listen(8000, async () => {
  await connectToDb();
  console.log("Server is listening at 8000");
});
