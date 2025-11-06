import {Request, Response} from "express";
import admin from "firebase-admin";

export const updateList = (req: Request, res: Response) => {
  const {list, uid, image, author, title, isbn} = req.body;

  admin.firestore()
    .collection(uid).doc("lists")
    .collection(list).doc(isbn).set({
      isbn,
      title,
      author,
      image,
    }).then(() => {
      return res.status(200).json({message: "Book added"});
    }).catch((err) => {
      return res.status(401).send(err.message);
    });
};
