import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Middleware to verify JWT token sent by the client
function requireAuth(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attaching the user id to the request object, this will make it available in the endpoints that use this middleware
    req.userId = payload.userId;
    next();
  } catch (err) {
    // Returns a 401 error if the token is invalid
    return res.status(401).json({ error: "Unauthorized" });
  }
}

// this is a public endpoint because it doesn't have the requireAuth middleware
app.get("/ping", (req, res) => {
  console.log("Ping endpoint hit! 🏓 Pong! 🏓");
  res.send("pong");
});

app.post("/register", async (req, res) => {
  const { username, password, name } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { username, password: hashedPassword, name },
    select: { id: true, username: true, name: true },
  });

  const payload = { userId: newUser.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
  res.cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 });

  res.json(newUser);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // TEST
  console.log("Login attempt for username:", username); // Debug log

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    console.log("User not found"); // Debug log
    return res.status(401).json({ error: "Invalid credentials" });
  }

  console.log("User found, comparing passwords"); // Debug log
  // password: 123456
  // user.password: $2b$10$naV1eAwirV13nyBYVS96W..52QzN8U/UQ7mmi/IEEVJDtCAdDmOl2
  const validPassword = await bcrypt.compare(password, user.password);

  console.log("Password comparison result:", validPassword); // Debug log

  if (!validPassword) {
    console.log("Invalid credentials"); // Debug log
    return res.status(401).json({ error: "Invalid credentials" });
  }

  console.log("Valid credentials"); // Debug log

  const payload = { userId: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
  res.cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 });

  // ensure that the password is not sent to the client
  const userData = {
    id: user.id,
    username: user.username,
    name: user.name,
  };

  res.json(userData);
});

app.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// requireAuth middleware will validate the access token sent by the client and will return the user information within req.auth
app.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, username: true, name: true },
  });
  res.json(user);
});

// Menu
// GET menu items (public)
app.get("/menu-items", async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

// Additional endpoints that use the requireAuth middleware ------------------------------------------------------------

// GET reservations (protected)
// This endpoint uses the requireAuth middleware to verify the access token sent by the client
app.get("/reservations", requireAuth, async (req, res) => {
  try {
    // get the user id from the request object
    const userId = req.userId;
    // fetch the reservations for the user
    const reservations = await prisma.reservationItem.findMany({
      // Get all reservations in the database (created by all users)
      orderBy: { date: 'asc' },
      include: {
        user: {
          select: {
            username: true,
            name: true
          }
        }
      }
    });

    // send the reservations to the client
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

// POST new reservation (protected)
// This endpoint uses the requireAuth middleware to verify the access token sent by the client
app.post("/reservations", requireAuth, async (req, res) => {
  try {
    const { date, time, partySize, occasion } = req.body;
    const userId = req.userId;
    
    const reservation = await prisma.reservationItem.create({
      data: {
        date,
        time,
        partySize,
        occasion,
        userId,  // Make sure this is included
      },
      include: {  // Include the user data in the response
        user: {
          select: {
            username: true,
            name: true
          }
        }
      }
    });

    console.log('Reservation created:', reservation);
    res.json(reservation);
  } catch (error) {
    console.error('Reservation creation error:', {
      message: error.message,
      code: error.code
    });
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

// PUT (update) reservation (protected)
app.put("/reservations/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { partySize, occasion } = req.body;  // Only destructure allowed fields

    // Verify the reservation belongs to the user
    const reservation = await prisma.reservationItem.findUnique({
      where: { id: parseInt(id) }
    });

    if (!reservation || reservation.userId !== req.userId) {
      return res.status(403).json({ error: "Not authorized to update this reservation" });
    }

    // Update only allowed fields
    const updatedReservation = await prisma.reservationItem.update({
      where: { id: parseInt(id) },
      data: {
        partySize,
        occasion
      }
    });

    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ error: "Failed to update reservation" });
  }
});

// DELETE reservation (protected)
app.delete("/reservations/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.userId;

    // First check if reservation exists and belongs to user
    const existingReservation = await prisma.reservationItem.findUnique({
      where: { id }
    });

    if (!existingReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    if (existingReservation.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to delete this reservation" });
    }

    // Delete the reservation
    await prisma.reservationItem.delete({
      where: { id }
    });
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reservation" });
  }
});


// ----------------------------------------------------------------
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});