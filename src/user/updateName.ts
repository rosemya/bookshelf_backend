import {Request, Response} from "express";
import admin from "firebase-admin";

export const updateUserName = async (req: Request, res: Response) => {
  const {firstName, lastName, uid} = req.body;

  admin.auth().updateUser(uid, {displayName: `${firstName} ${lastName}`})
    .then(() => {
      return res.status(200).json({message: "User updated"});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
