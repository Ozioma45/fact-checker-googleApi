// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const GOOGLE_FACTCHECK_API =
  "https://factchecktools.googleapis.com/v1alpha1/claims:search";

app.get("/api/fact-check", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const response = await axios.get(GOOGLE_FACTCHECK_API, {
      params: {
        query,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    res.json(response.data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching fact-check data", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
