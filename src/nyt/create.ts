import admin from "firebase-admin";
import {Request, Response} from "express";

export const storeNYTBestSellers = async (req: Request, res: Response) => {
  try {
    const getNYT = await fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.NYT_KEY}`);
    const data = await getNYT.json();

    // Store date NYT Best Sellers was updated
    await admin.firestore()
      .collection("nyt").doc("bestSellers").set({
        date: new Date(),
      });

    // Get NYT Best Sellers Lists
    const lists = data.results.lists;

    // Store books in firestore
    lists.forEach((list: any) => {
      admin.firestore()
        .collection("nyt").doc("bestSellers")
        .collection("books").doc(list.list_id.toString())
        .set({
          listName: list.display_name,
          books: list.books,
        });
    });

    return res.status(200).json({message: "NYT Best Sellers updated"});
  } catch (e) {
    return res.status(500).send("An error occurred");
  }
};
