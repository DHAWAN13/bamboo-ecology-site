/* =====================================
   IMPORT REQUIRED MODULES
===================================== */
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");

const ProjectRequest = require("./models/ProjectRequest");

/* =====================================
   INITIALIZE EXPRESS APP
===================================== */
const app = express();

const PORT = process.env.PORT || 3000;

/* =====================================
   MIDDLEWARE
===================================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

/* =====================================
   HEALTH CHECK ROUTE
===================================== */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "TechBamboo app is healthy",
  });
});

/* =====================================
   MONGODB CONNECTION
===================================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
  });

/* =====================================
   MULTER CONFIGURATION
===================================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/* =====================================
   PAGE ROUTES
===================================== */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/cs-ecology", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cs-ecology.html"));
});

app.get("/bamboo", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "bamboo.html"));
});

app.get("/architecture", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "architecture.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "gallery.html"));
});

app.get("/request-quote", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "request-quote.html"));
});

app.get("/request-success/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "request-success.html"));
});

/* =====================================
   CREATE PROJECT REQUEST
===================================== */
app.post(
  "/submit-request",
  upload.single("referenceImage"),
  async (req, res) => {
    try {
      const newRequest = new ProjectRequest({
        ...req.body,
        referenceImage: req.file ? req.file.filename : null,
      });

      await newRequest.save();

      console.log("Saved Request:", newRequest._id);

      res.redirect(`/request-success/${newRequest._id}`);
    } catch (err) {
      console.error("Save error:", err);

      res.status(500).send("Save failed");
    }
  },
);

/* =====================================
   ADMIN PAGE
===================================== */
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin-requests.html"));
});

/* =====================================
   ADMIN READ REQUESTS
===================================== */
app.get("/admin/requests", async (req, res) => {
  try {
    const requests = await ProjectRequest.find().sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("READ error:", err);

    res.status(500).send("Read failed");
  }
});

/* =====================================
   ADMIN UPDATE STATUS
===================================== */
app.post("/admin/update-status", async (req, res) => {
  try {
    const { requestId, status } = req.body;

    const updated = await ProjectRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true },
    );

    if (!updated) {
      return res.status(404).send("Request not found");
    }

    res.send("Status updated successfully");
  } catch (err) {
    console.error("UPDATE error:", err);

    res.status(500).send("Update failed");
  }
});

/* =====================================
   ADMIN DELETE REQUEST
===================================== */
app.post("/admin/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await ProjectRequest.findByIdAndDelete(id);

    res.send("Project request deleted successfully");
  } catch (err) {
    console.error("DELETE error:", err);

    res.status(500).send("Delete failed");
  }
});

/* =====================================
   EXPORT EXPRESS APP
===================================== */
module.exports = app;
