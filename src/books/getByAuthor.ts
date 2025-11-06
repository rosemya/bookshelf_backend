import {Request, Response} from "express";

export const getBooksByAuthor = (req: Request, res: Response) => {
  const {author, index} = req.query;
  const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&startIndex=${index}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return res.status(200).json({message: data});
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
