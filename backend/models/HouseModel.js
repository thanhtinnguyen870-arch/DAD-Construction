const mongoose = require('mongoose');

const houseModelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String }, // e.g. Nhà phố, Biệt thự
  style: { type: String },
  area: { type: String },
  width: { type: String },
  length: { type: String },
  floors: { type: Number },
  bedrooms: { type: Number },
  functions: { type: String },
  estimatedDesignCost: { type: String },
  estimatedBuildCost: { type: String },
  description: { type: String },
  thumbnail: { type: String },
  images: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('HouseModel', houseModelSchema);
