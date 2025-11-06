import {Request, Response} from "express";
import admin from "firebase-admin";

export const deleteReview = async (req: Request, res: Response) => {
  const {isbn, uid} = req.params;

  admin.firestore().
    collection("reviews").doc(isbn)
    .collection("review").doc(uid).delete()
    .then(() => {
      return res.status(200).json({message: "Review deleted"});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
