import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT;

const publicDir = path.join(import.meta.dirname, "public");
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true }));

app.post("/contact", (req, res) => {
  // console.log(req.query); // for get
  console.log(req.body);
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
