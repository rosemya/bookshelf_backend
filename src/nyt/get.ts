import {Request, Response} from "express";
import admin from "firebase-admin";

export const getNYTBestSellers = async (req: Request, res: Response) => {
  admin.firestore()
    .collection("nyt").doc("bestSellers")
    .collection("books").get()
    .then((result) => {
      const data = result.docs;
      const info: any[] = [];

      data.forEach((doc) => {
        info.push(doc.data());
      });

      return res.status(200).json({message: info});
    }).catch((err) => {
      return res.status(500).send(err.message);
    });
};
