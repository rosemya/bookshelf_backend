import {Request, Response} from "express";
import admin from "firebase-admin";

export const deleteList = async (req: Request, res: Response) => {
  const {uid, list} = req.params;

  const batch = admin.firestore().batch();
  const snapshot = admin.firestore()
    .collection(uid).doc("lists")
    .collection(list);

  snapshot.get()
    .then((results) => {
      results.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      batch.commit();

      return res.status(200).json({message: "Deleted"});
    }).catch((err) => {
      return res.status(500).send(err.message);
    });
};
