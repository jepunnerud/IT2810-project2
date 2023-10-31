import express from "express";
import controller from "../controllers/user";

const router = express.Router();
const { getUser, createUser, getUsers } = controller;

router.post("/create", createUser);
router.get("/get/:email", getUser);
router.get("/get", getUsers);

export default router;
