import express from "express";
import multer from 'multer';
import userController from "../controllers/users";

const routes = express.Router();

const upload = multer({ dest : 'uploads/' })

routes.get('/project-list', userController.getProjectList);

routes.post("/create-project", userController.createProject);

routes.post("/create-scan", userController.createScan);

export = routes;