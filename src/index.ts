import {setGlobalOptions} from "firebase-functions";
import cors from "cors";
import express, {Response, Request} from "express";
import admin from "firebase-admin";
import * as functions from "firebase-functions";

import {createUser} from "./user/create";
import {getUser} from "./user/get";
import {deleteUser} from "./user/delete";
import {updateUserEmail} from "./user/updateEmail";
import {updateUserPassword} from "./user/updatePassword";
import {updateUserName} from "./user/updateName";
import {getList} from "./list/get";
import {getAllList} from "./list/getAll";
import {updateList} from "./list/update";
import {deleteList} from "./list/delete";
import {deleteBookFromList} from "./list/deleteBook";
import {getNYTBestSellers} from "./nyt/get";
import {storeNYTBestSellers} from "./nyt/create";
import {getBook} from "./books/getBook";
import {getBooksByAuthor} from "./books/getByAuthor";
import {getBooksByCategory} from "./books/getByCategory";
import {createReview} from "./reviews/create";
import {getAllReviews} from "./reviews/getAll";
import {getReviews} from "./reviews/get";
import {deleteReview} from "./reviews/delete";


// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

admin.initializeApp();

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Hi there!");
});

app.get("/user/:email", getUser);
app.post("/user", createUser);
app.put("/user/email", updateUserEmail);
app.put("/user/password", updateUserPassword);
app.put("/user/name", updateUserName);
app.delete("/user/:uid", deleteUser);

app.get("/list/:uid", getAllList);
app.get("/list/:uid/:list", getList);
app.post("/list", updateList);
app.delete("/list/:uid/:list", deleteList);
app.delete("/list/:uid/:list/:isbn", deleteBookFromList);

app.get("/book/:isbn", getBook);
app.get("/author", getBooksByAuthor);
app.get("/category", getBooksByCategory);

app.get("/nyt", getNYTBestSellers);
app.get("/nyt/push", storeNYTBestSellers);

app.get("/review/:isbn", getAllReviews);
app.get("/review/:isbn/:uid", getReviews);
app.post("/review", createReview);
app.delete("/review/:isbn/:uid", deleteReview);

exports.app = functions.https.onRequest(app);
