require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Models
const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require('./model/PositionsModel');
const { OrdersModel } = require('./model/OrdersModel');

// Routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const holdingsRoutes = require('./routes/holdings');

const app = express(); // ✅ MUST be before app.use

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    'http://localhost:3003',
    'http://localhost:3001',
  ],
  credentials: true
}));

// Route usage
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/holdings', holdingsRoutes); // ✅ NEW route

// ================= API ROUTES =================

// Get all holdings (existing)
app.get('/allHoldings', async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all positions
app.get('/allPositions', async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place order
app.post("/newOrder", async (req, res) => {
  try {
    const name = req.body.name.toUpperCase().trim();
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);
    const mode = req.body.mode;

    // BUY
    if (mode === "BUY") {
      let existing = await HoldingsModel.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") }
      });

      if (existing) {
        const newQty = existing.qty + qty;
        const newAvg =
          (existing.avg * existing.qty + price * qty) / newQty;

        existing.qty = newQty;
        existing.avg = newAvg;
        existing.price = price;

        await existing.save();
      } else {
        const newHolding = new HoldingsModel({
          name,
          qty,
          avg: price,
          price,
          net: "0%",
          day: "0%",
        });

        await newHolding.save();
      }
    }

    // SELL
    if (mode === "SELL") {
      let existing = await HoldingsModel.findOne({ name });

      if (!existing) {
        return res.status(400).json({
          message: "Stock not found",
        });
      }

      if (existing.qty < qty) {
        return res.status(400).json({
          message: "Not enough quantity",
        });
      }

      existing.qty -= qty;

      if (existing.qty === 0) {
        await HoldingsModel.deleteOne({ name });
      } else {
        await existing.save();
      }
    }

    // Save order
    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Order placed",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error placing order",
    });
  }
});

// ================= DB CONNECT =================

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

mongoose.connect(uri)
  .then(() => {
    console.log("DB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB error:", err);
  });