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
    status: "pending",
  });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, status, id } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment: any) => comment.id === id);
    comment.status = status;
    axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on posrt 4001");
});
