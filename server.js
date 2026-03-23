const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

// 🔥 IMPORTANT: correct static path
app.use(express.static(path.join(__dirname, "public")));

// 👉 Home route fix
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get result
app.post("/get-result", (req, res) => {
  const { prn } = req.body;
  const data = JSON.parse(fs.readFileSync("data.json"));
  const student = data.find(s => s.prn == prn);

  if (student) res.json(student);
  else res.json({ message: "Not found" });
});

// Add result
app.post("/add-result", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  data.push(req.body);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ message: "Added" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));