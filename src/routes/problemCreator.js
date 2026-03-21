const express = require('express');
const  probRouter = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
probRouter.post("/create",adminMiddleware,createProblem);
probRouter.get("/:id",getProblemById );
probRouter.get("/",getAllProblem);
probRouter.get("/user",solvedProblem);
probRouter.patch("/:id",problemUpdate);
probRouter.delete("/:id",deleteProblem);



