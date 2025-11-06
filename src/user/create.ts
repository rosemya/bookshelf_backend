import {Request, Response} from "express";
import admin from "firebase-admin";
import {UserRecord} from "firebase-admin/auth";

export const createUser = async (req: Request, res: Response) => {
  const {firstName, lastName, email, password} = req.body;

  admin.auth()
    .createUser({email, password, displayName: `${firstName} ${lastName}`})
    .then((user: UserRecord) => {
      return res.status(200).json({message: user});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
