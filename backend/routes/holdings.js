const express = require("express");
const router = express.Router();

const { HoldingsModel } = require("../model/HoldingsModel");

// GET all holdings
router.get("/", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find();
    res.json(holdings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;