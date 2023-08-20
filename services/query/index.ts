import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts: any = {};
app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

const handleEvent = (type: any, data: any) => {
  console.log(type);
  console.log(data);
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((item: any) => item.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: "OK" });
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  const res = await axios.get("http://event-bus-srv:4005/events");
  // console.log(res.data);
  for (let event of res.data) {
    const { type, data } = event as any;
    handleEvent(type, data);
  }
});
