const HouseModel = require('../models/HouseModel');

const getHouseModels = async (req, res) => {
  try {
    const models = await HouseModel.find({}).sort('-createdAt');
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHouseModelBySlug = async (req, res) => {
  try {
    const model = await HouseModel.findOne({ slug: req.params.slug });
    if (model) res.json(model);
    else res.status(404).json({ message: 'Model not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createHouseModel = async (req, res) => {
  try {
    const model = new HouseModel(req.body);
    const created = await model.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHouseModel = async (req, res) => {
  try {
    const model = await HouseModel.findById(req.params.id);
    if (model) {
      Object.assign(model, req.body);
      const updated = await model.save();
      res.json(updated);
    } else res.status(404).json({ message: 'Model not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteHouseModel = async (req, res) => {
  try {
    const model = await HouseModel.findById(req.params.id);
    if (model) {
      await model.deleteOne();
      res.json({ message: 'Model removed' });
    } else res.status(404).json({ message: 'Model not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHouseModels, getHouseModelBySlug, createHouseModel, updateHouseModel, deleteHouseModel };
