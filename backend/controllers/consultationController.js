const ConsultationRequest = require('../models/ConsultationRequest');

const getConsultations = async (req, res) => {
  try {
    const requests = await ConsultationRequest.find({}).sort('-createdAt');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createConsultation = async (req, res) => {
  try {
    const request = new ConsultationRequest(req.body);
    const created = await request.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateConsultationStatus = async (req, res) => {
  try {
    const request = await ConsultationRequest.findById(req.params.id);
    if (request) {
      request.status = req.body.status || request.status;
      const updated = await request.save();
      res.json(updated);
    } else res.status(404).json({ message: 'Request not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteConsultation = async (req, res) => {
  try {
    const request = await ConsultationRequest.findById(req.params.id);
    if (request) {
      await request.deleteOne();
      res.json({ message: 'Request removed' });
    } else res.status(404).json({ message: 'Request not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getConsultations, createConsultation, updateConsultationStatus, deleteConsultation };
