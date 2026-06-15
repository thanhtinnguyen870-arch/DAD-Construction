const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
  companyName: { type: String, default: 'DAD Construction' },
  logo: { type: String },
  slogan: { type: String, default: 'Kiến tạo tổ ấm – Nâng tầm không gian sống' },
  phone: { type: String, default: '0778236311' },
  email: { type: String, default: 'dadcons.arc@gmail.com' },
  address: { type: String },
  facebook: { type: String },
  zalo: { type: String },
  googleMap: { type: String },
  aboutShort: { type: String },
  aboutFull: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);
