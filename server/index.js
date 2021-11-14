const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Router
const postRouter = require("./routes/Post.route");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments.route");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users.route");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(4040, () => {
    console.log("Server is Running on port 4040, Alhamdulilah");
  });
});
