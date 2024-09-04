import express from "express";
import userController from "../controllers/users";

const routes = express.Router();



routes.get('/project-list', userController.getProjectList);

routes.post("/create-project", userController.createProject);

routes.post("/create-scan", userController.createScan);

export = routes;