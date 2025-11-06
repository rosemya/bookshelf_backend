import {Request, Response} from "express";
import admin from "firebase-admin";

export const createReview = async (req: Request, res: Response) => {
  const {uid, isbn, review, rating} = req.body;

  const name = await admin.auth().getUser(uid)
    .then((user) => user.displayName || "Anonymous")
    .catch(() => "Anonymous");

  admin.firestore()
    .collection("reviews").doc(isbn)
    .collection("review").doc(uid).set({
      review,
      rating,
      name,
      date: new Date().toDateString(),
    }).then(() => {
      return res.status(200).json({message: "Review added"});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
