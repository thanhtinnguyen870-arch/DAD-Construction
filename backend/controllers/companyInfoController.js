const CompanyInfo = require('../models/CompanyInfo');

const getCompanyInfo = async (req, res) => {
  try {
    const info = await CompanyInfo.findOne();
    if (info) res.json(info);
    else res.status(404).json({ message: 'Company info not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCompanyInfo = async (req, res) => {
  try {
    let info = await CompanyInfo.findOne();
    if (!info) {
      info = new CompanyInfo(req.body);
    } else {
      Object.assign(info, req.body);
    }
    const updated = await info.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getCompanyInfo, updateCompanyInfo };
