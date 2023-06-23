import express from "express";
import { v4 as uuid } from "uuid";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: any = {};

app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.send(comments);
});
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = uuid();
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({
    id: commentId,
    content,
  });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body);
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on posrt 4001");
});
