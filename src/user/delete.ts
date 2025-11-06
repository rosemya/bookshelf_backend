import {Request, Response} from "express";
import admin from "firebase-admin";

export const deleteUser = async (req: Request, res: Response) => {
  const {uid} = req.params;

  admin.auth().deleteUser(uid)
    .then(() => {
      return res.status(200).json({message: "User deleted"});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
