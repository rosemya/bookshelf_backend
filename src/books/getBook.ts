import {Request, Response} from "express";

export const getBook = async (req: Request, res: Response) => {
  const {isbn} = req.params;
  const link = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      return res.status(200).json({message: data.items[0]});
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
