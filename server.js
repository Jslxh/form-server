const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine: EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); 

// Routes
app.get("/", (req, res) => {
  res.render("form", { errors: null, form: {} });
});

app.post("/submit", (req, res) => {
  const { name, email, age } = req.body;

  const errors = {};
  if (!name || name.trim().length < 2) errors.name = "Name min 2 characters";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) errors.email = "Enter a valid email";
  const ageNum = Number(age);
  if (!age || Number.isNaN(ageNum) || ageNum < 1) errors.age = "Enter a valid age";

  if (Object.keys(errors).length > 0) {
    return res.status(400).render("form", { errors, form: { name, email, age } });
  }

  res.render("result", { name, email, age });
});

// 404
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
