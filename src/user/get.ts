import {Request, Response} from "express";
import admin from "firebase-admin";
import {UserRecord} from "firebase-admin/auth";

export const getUser = async (req: Request, res: Response) => {
  const {email} = req.params;

  admin.auth().getUserByEmail(email)
    .then((userRecord: UserRecord) => {
      return res.status(200).json({message: userRecord});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
