import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes";

const port = process.env.PORT;

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/cocktail-connoisseur-api", {
    dbName: "connoisseurDB",
    retryWrites: true,
    w: "majority",
  })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

// app.use(helmet());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers,",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  }

  next();
});

/** Setup server routes */
app.use(router);

app.listen(8001, () => {
  console.log(`now listening on 8001 ${8001}`);
});
