const mongoose = require('mongoose');

const consultationRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  constructionType: { type: String },
  landArea: { type: String },
  floors: { type: Number },
  style: { type: String },
  budget: { type: String },
  message: { type: String },
  status: { type: String, enum: ['Mới', 'Đang tư vấn', 'Đã xử lý'], default: 'Mới' }
}, { timestamps: true });

module.exports = mongoose.model('ConsultationRequest', consultationRequestSchema);
