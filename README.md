# 🚀 Zerodha Clone (Stock Trading Simulator)

## 📌 Project Overview

This project is a **stock trading simulator** inspired by Zerodha.
It allows users to simulate buying and selling stocks, view holdings, and track profit/loss using a dashboard.

> ⚠️ Note: This is not a real trading platform. It uses dummy data for learning purposes.

---

## 🛠️ Tech Stack

* Frontend: React.js
* Backend: Node.js, Express.js
* Database: MongoDB
* Authentication: JWT (JSON Web Tokens)

---

## ✨ Features

* User Signup & Login 🔐
* Buy & Sell Stocks 📈
* View Holdings 📊
* Track Profit & Loss 💰
* Dashboard UI similar to Zerodha

---

## 📂 Project Structure

```
stock-trading-main/
 ├── backend/
 ├── frontend/
 ├── dashboard/
 ├── .gitignore
 ├── package.json
 └── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/zerodha-clone.git
cd zerodha-clone
```

---

### 2️⃣ Install dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd ../frontend
npm install
```

#### Dashboard

```
cd ../dashboard
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file inside `backend/`:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
REFRESH_SECRET=your_secret
PORT=3002
```

---

### 4️⃣ Run the project

#### Start backend

```
cd backend
npm start
```

#### Start frontend

```
cd frontend
npm start
```

#### Start dashboard

```
cd dashboard
npm start
```

---

## 📊 How It Works

1. User logs in/signup
2. Places buy/sell order
3. Backend stores data in MongoDB
4. Dashboard fetches and displays holdings
5. Profit/Loss calculated based on stored data

---

## 🎯 Future Improvements

* Real-time stock API integration
* Better UI/UX
* Advanced charts
* Portfolio analytics

---

## 👨‍💻 Author

Laxmireddy

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
