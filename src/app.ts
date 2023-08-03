import express from "express";
import { fetchDiscoveryFeed, fetchMovieDetail, fetchNewMovies } from "./tmdb-wrapper";
import cors from "cors";

const app = express();
const port = 3300;

const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fetchNewMovies", async (req, res) => {
  fetchNewMovies()
    .then((data) => {
      console.log(data);
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
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the Promise execution
      //console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
