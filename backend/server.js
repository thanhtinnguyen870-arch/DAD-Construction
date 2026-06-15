const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const houseModelRoutes = require('./routes/houseModelRoutes');
const blogRoutes = require('./routes/blogRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const companyInfoRoutes = require('./routes/companyInfoRoutes');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : true;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/house-models', houseModelRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/company-info', companyInfoRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
