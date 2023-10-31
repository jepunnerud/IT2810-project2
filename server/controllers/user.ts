import User from "../models/user";
import { RequestHandler } from "express";

const createUser: RequestHandler = async (req, res) => {
  const user = new User(req.body);
  return user
    .save()
    .then((user) => res.status(201).json(user))
    .catch((e) => res.status(500).json(e));
};

const getUser: RequestHandler = async (req, res) => {
  return User.findOne({ email: req.params.email })
    .then((user) => (user ? res.status(200).json(user) : res.status(404)))
    .catch((e) => res.status(500).json(e));
};

const getUsers: RequestHandler = async (req, res) => {
  return User.find({})
    .then((user) => (user ? res.status(200).json(user) : res.status(404)))
    .catch((e) => res.status(500).json(e));
};

export default { getUser, createUser, getUsers };
