const mongoose = require('mongoose');
const dotenv = require('dotenv');

  process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // 🔹 Add this
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('✅ DB connection successful!'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit if DB connection fails
  });

const port = process.env.PORT || 4000; // Ensure this matches Render's port
const server = app.listen(port, () => {
  console.log(`🚀 App running on port ${port}...`);
});


process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
