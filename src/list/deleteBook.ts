import {Request, Response} from "express";
import admin from "firebase-admin";

export const deleteBookFromList = async (req: Request, res: Response) => {
  const {uid, list, isbn} = req.params;

  admin.firestore()
    .collection(uid).doc("lists")
    .collection(list).doc(isbn).delete()
    .then(() => {
      return res.status(200).json({message: "Book deleted"});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
