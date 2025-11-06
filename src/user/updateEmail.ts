import {Request, Response} from "express";
import admin from "firebase-admin";

export const updateUserEmail = async (req: Request, res: Response) => {
  const {email, uid} = req.body;

  admin.auth().updateUser(uid, {email})
    .then(() => {
      return res.status(200).json({message: "User updated"});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
