import {Request, Response} from "express";
import admin from "firebase-admin";

export const updateUserPassword = async (req: Request, res: Response) => {
  const {password, uid} = req.body;

  admin.auth().updateUser(uid, {password})
    .then(() => {
      return res.status(200).json({message: "User updated"});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
