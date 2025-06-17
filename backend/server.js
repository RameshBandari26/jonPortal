  // //server.js
  // const express = require('express');
  // const mongoose = require('mongoose');
  // const cors = require('cors');
  // require('dotenv').config();

  // const authRoutes = require('./Routes/Auth.js');
  // const userRoutes = require('./Routes/userRoutes.js'); // Assuming you have a user data route
  // const jobRoutes = require('./Routes/jobRoutes');
  // const notificationRoutes = require('./Routes/notificationRoutes.js');
  // const verifyRoutes = require('./Routes/verifyRoutes.js');

  // const apiUrl = process.env.API_URL;

  // const app = express();

  // // Middleware
  // app.use(cors());
  // app.use(express.json());

  // // Log incoming requests for debugging
  // app.use((req, res, next) => {
  //   console.log(`${req.method} ${req.url}`);
  //   next();
  // });

  // // Routes
  // app.use('/api/users', userRoutes);
  // app.use('/api/auth', authRoutes);
  // app.use('/api/jobs', jobRoutes);
  // app.use('/api/notifications', notificationRoutes);
  // app.use('/api/verify', verifyRoutes);


  // // Connect to MongoDB and start server
  // mongoose.connect(process.env.MONGO_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  // .then(() => {
  //   console.log('MongoDB connected');
  //   app.listen(process.env.PORT, '0.0.0.0', () => {
  //     console.log(`Server running on port ${process.env.PORT}`);
  //   });
  // })
  // .catch(err => {
  //   console.error('MongoDB connection error:', err);
  // });


  const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ✅ ADD THESE
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./Routes/Auth.js');
const userRoutes = require('./Routes/userRoutes.js');
const jobRoutes = require('./Routes/jobRoutes');
const notificationRoutes = require('./Routes/notificationRoutes.js');
const verifyRoutes = require('./Routes/verifyRoutes.js');

const apiUrl = process.env.API_URL;

const app = express();

// ✅ CREATE HTTP SERVER
const server = http.createServer(app); // <-- Socket.IO needs this

// ✅ CREATE SOCKET.IO SERVER
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// ✅ SOCKET.IO CONNECTION HANDLER
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId); // join user-specific room
    console.log(`User ${userId} joined their notification room`);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
});

// ✅ MAKE io AVAILABLE GLOBALLY
global.io = io;

// Middleware
app.use(cors());
app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/verify', verifyRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');

    // ✅ START SERVER WITH SOCKET.IO COMPATIBILITY
    server.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
