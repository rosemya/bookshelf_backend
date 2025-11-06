import {Request, Response} from "express";

export const getBooksByCategory = (req: Request, res: Response) => {
  const {subject, index, max} = req.query;
  const url = `http://openlibrary.org/subjects/${subject}.json?limit=${max}&offset=${index}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return res.status(200).json({message: data});
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
