import config from "./config/server.js";

import fetch from "node-fetch";
import { createApi } from "unsplash-js";
import express from "express";

global.fetch = fetch;
const unsplash = createApi({
  accessKey: config.APPLICATION_ID,
});

const app = express();

app.get("/api/photos", (req, res) => {
  unsplash.photos
    .list({ page: req.query.start, perPage: req.query.count })
    .then((json) => {
      res.json(json);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
