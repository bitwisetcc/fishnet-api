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
  if (req.body.nome != null) {
    res.fish.nome = req.body.nome;
  }
  if (req.body.email != null) {
    res.fish.email = req.body.email;
  }
  if (req.body.telefone != null) {
    res.fish.telefone = req.body.telefone;
  }
  if (req.body.endereco != null) {
    res.fish.endereco = req.body.endereco;
  }
  if (req.body.foto != null) {
    res.fish.foto = req.body.foto;
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
