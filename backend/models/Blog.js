const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String },
  thumbnail: { type: String },
  excerpt: { type: String },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
