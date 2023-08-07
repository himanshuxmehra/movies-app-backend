import express from "express";
import {
  fetchDiscoveryFeed,
  fetchMovieDetail,
  fetchMovieVideo,
  fetchNewMovies,
} from "./tmdb-wrapper";
import cors from "cors";
require("dotenv").config();

const app = express();
const whitelist = [process.env.REACTAPP_URL];
console.log(whitelist);
const corsOptions = {
  origin: whitelist,
  credentials: true,
  allowedHeaders: ["Content-Type"],
  methods: ["GET", "POST"],
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fetchNewMovies", async (req, res) => {
  fetchNewMovies()
    .then((data) => {
      console.log(data);

      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.json(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the Promise execution
      //console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/fetchDiscoveryFeed", async (req, res) => {
  fetchDiscoveryFeed()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the Promise execution
      //console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/fetchMovieDetail/:id", async (req, res) => {
  fetchMovieDetail(req.params.id)
    .then((data) => {
      //console.log(data);
      res.json(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the Promise execution
      //console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/fetchMovieDetail/video/:id", async (req, res) => {
  fetchMovieVideo(req.params.id)
    .then((data) => {
      //console.log(data);
      data.results.map((video: any) =>
        video.type === "Trailer" && video.site === "Youtube"
          ? res.json(video)
          : console.log(video)
      );
    })
    .catch((error) => {
      // Handle any errors that occur during the Promise execution
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});
const port = process.env.PORT;
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
