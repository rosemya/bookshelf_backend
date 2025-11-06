import {Request, Response} from "express";
import admin from "firebase-admin";

export const getReviews = async (req: Request, res: Response) => {
  const {isbn, uid} = req.params;

  admin.firestore()
    .collection("reviews").doc(isbn)
    .collection("review").doc(uid).get()
    .then((result) => {
      return res.status(200).json({message: result.data()});
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
};
