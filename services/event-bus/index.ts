import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const events: any = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post("http://post-clusterip-srv:4000/events", event).catch(() => {});
  axios.post("http://comments-srv:4001/events", event).catch(() => {});
  axios.post("http://query-srv:4002/events", event).catch(() => {});
  axios.post("http://moderation-srv:4003/events", event).catch(() => {});

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
