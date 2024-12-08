const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2");

const port = "8081";
const host = "localhost";

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456", 
  database: "secoms3190",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1); 
  }
  console.log("Connected to the database successfully.");
});

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName); 
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG and PNG files are allowed."));
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, 
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); 

app.listen(port, () => {
  console.log(`App running at http://${host}:${port}/`);
});


app.get("/contact", (req, res) => {
  const query = "SELECT * FROM contact";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching contacts:", err.message);
      return res.status(500).json({ error: "Failed to fetch contacts" });
    }
    res.status(200).json(result);
  });
});

app.post("/contact", upload.single("image"), (req, res) => {
  const { contact_name, phone_number, message } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const checkQuery = "SELECT * FROM contact WHERE contact_name = ?";
  db.query(checkQuery, [contact_name], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Validation error:", checkErr.message);
      return res.status(500).json({ error: "Error validating contact name" });
    }
    if (checkResult.length > 0) {
      return res.status(409).json({ error: "Contact name already exists" });
    }

    const query =
      "INSERT INTO contact (contact_name, phone_number, message, image_url) VALUES (?, ?, ?, ?)";
    db.query(query, [contact_name, phone_number, message, imageUrl], (err) => {
      if (err) {
        console.error("Error adding contact:", err.message);
        return res.status(500).json({ error: "Failed to add contact" });
      }
      res.status(201).json({ message: "Contact added successfully" });
    });
  });
});

app.delete("/contact/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM contact WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting contact:", err.message);
      return res.status(500).json({ error: "Failed to delete contact" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  });
});

app.put("/contact/:id", (req, res) => {
  const { id } = req.params;
  const { contact_name, phone_number, message } = req.body;

  const query =
    "UPDATE contact SET contact_name = ?, phone_number = ?, message = ? WHERE id = ?";
  db.query(query, [contact_name, phone_number, message, id], (err, result) => {
    if (err) {
      console.error("Error updating contact:", err.message);
      return res.status(500).json({ error: "Failed to update contact" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfully" });
  });
});

app.get("/contact/name", (req, res) => {
  const { contact_name } = req.query;
  if (!contact_name) {
    return res.status(400).json({ error: "contact_name is required" });
  }

  const query =
    "SELECT * FROM contact WHERE LOWER(contact_name) LIKE LOWER(?)";
  const searchValue = `%${contact_name}%`;
  db.query(query, [searchValue], (err, result) => {
    if (err) {
      console.error("Error searching contacts:", err.message);
      return res.status(500).json({ error: "Failed to search contacts" });
    }
    res.status(200).json(result);
  });
});
