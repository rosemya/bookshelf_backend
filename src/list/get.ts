import {Request, Response} from "express";
import admin from "firebase-admin";


export const getList = (req: Request, res: Response) => {
  const {uid, list} = req.params;
  console.log(uid, list);
  admin.firestore()
    .collection(uid).doc("lists").collection(list).get()
    .then((result) => {
      const books: any[] = [];
      result.docs.forEach((doc) => {
        books.push(doc.data());
      });
      return res.status(200).json({message: books});
    }).catch((err) => {
      return res.status(500).send(err.message);
    });
};
