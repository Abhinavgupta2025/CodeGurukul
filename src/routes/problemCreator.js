const express = require('express');
const  probRouter = express.Router();

probRouter.post("/create",problemCreate);
probRouter.get("/:id",problemFetch);
probRouter.get("/",getAllProblem);
probRouter.get("/user",solvedProblem);
probRouter.patch("/:id",problemUpdate);
probRouter.delete("/:id",problemDelete);



