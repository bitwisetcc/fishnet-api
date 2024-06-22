const express = require('express');
const router = express.Router();
const Fish = require('../models/fish');

// Rota para obter todos os fishs
router.get('/', async (req, res) => {
  try {
    const fish = await Fish.find();
    res.json(fish);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um fish por ID
router.get('/:id', getFish, (req, res) => {
  res.json(res.fish);
});

// Rota para criar um novo fish
router.post('/', async (req, res) => {
  const fish = new Fish({
    name_species: req.body.name_species,
    price: req.body.price,
    picture: req.body.picture,
    description: req.body.description,
    ecosystem: req.body.ecosystem,
    feeding: req.body.feeding,
    size: req.body.size,
    tank_size: req.body.tank_size,
    velocity: req.body.velocity,
    origin: req.body.origin,
    social_behavior: req.body.social_behavior,
  });

  try {
    const newFish = await fish.save();
    res.status(201).json(newFish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um fish por ID
router.put('/:id', getFish, async (req, res) => {
  if (req.body.name_species != null) {
    res.fish.name_species = req.body.name_species;
  }
  if (req.body.price != null) {
    res.fish.price = req.body.price;
  }
  if (req.body.picture != null) {
    res.fish.picture = req.body.picture;
  }
  if (req.body.description != null) {
    res.fish.description = req.body.description;
  }
  if (req.body.ecosystem != null) {
    res.fish.ecosystem = req.body.ecosystem;
  }
  if (req.body.feeding != null) {
    res.fish.feeding = req.body.feeding;
  }
  if (req.body.size != null) {
    res.fish.size = req.body.size;
  }
  if (req.body.tank_size != null) {
    res.fish.tank_size = req.body.tank_size;
  }
  if (req.body.velocity != null) {
    res.fish.velocity = req.body.velocity;
  }
  if (req.body.origin != null) {
    res.fish.origin = req.body.origin;
  }
  if (req.body.social_behavior != null) {
    res.fish.social_behavior = req.body.social_behavior;
  }

  try {
    const updatedFish = await res.fish.save();
    res.json(updatedFish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um fish por ID
router.delete('/:id', getFish, async (req, res) => {
  try {
    await res.fish.deleteOne();
    res.json({ message: 'Peixe excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getFish(req, res, next) {
  try {
    const fish = await Fish.findById(req.params.id);
    if (fish == null) {
      return res.status(404).json({ message: 'Peixe não encontrado' });
    }
    res.fish = fish;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
