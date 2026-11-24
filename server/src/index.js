import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json({ limit: "10kb" }));

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
  },
  { timestamps: true },
);

const Contact = mongoose.model("Contact", contactSchema);

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.post("/api/contact", async (request, response) => {
  const { name, email, message } = request.body ?? {};
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.length > 80 ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 120 ||
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.length > 3000
  ) {
    return response
      .status(400)
      .json({ message: "Please provide a valid name, email, and message." });
  }

  if (mongoose.connection.readyState !== 1) {
    return response
      .status(503)
      .json({ message: "Contact storage is not configured yet." });
  }

  try {
    await Contact.create({ name, email, message });
    return response
      .status(201)
      .json({ message: "Your message has been received." });
  } catch (error) {
    console.error("Unable to save contact request:", error.message);
    return response
      .status(500)
      .json({ message: "Unable to save your message right now." });
  }
});

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) =>
      console.error("MongoDB connection failed:", error.message),
    );
} else {
  console.warn(
    "MONGO_URI is not set. Contact form submissions will not be stored.",
  );
}

app.listen(port, () =>
  console.log(`Portfolio API listening on http://localhost:${port}`),
);
