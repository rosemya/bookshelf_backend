import {Request, Response} from "express";
import admin from "firebase-admin";

export const getAllList = (req: Request, res: Response) => {
  const {uid} = req.params;


  admin.firestore()
    .collection(uid).doc("lists").listCollections()
    .then((result) => {
      const collection: string[] = [];
      result.forEach((item) => {
        collection.push(item.id);
      });

      return res.status(200).json({message: collection});
    }).catch((err) => {
      return res.status(500).send(err.message);
    });
};
