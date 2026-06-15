const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  location: { type: String },
  area: { type: String },
  floors: { type: Number },
  estimatedCost: { type: String },
  constructionTime: { type: String },
  status: { type: String, enum: ['Đã hoàn thành', 'Đang thi công'], default: 'Đang thi công' },
  shortDescription: { type: String },
  description: { type: String },
  thumbnail: { type: String },
  images: [{ type: String }],
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
