const express = require('express');

const relationLib = require('../../../lib/admin/relation');

const router = express.Router();

async function createNewRelation(req, res) {
  const relationObject = req.body;

  try {
    const newRelation = await relationLib.createNewRelation(relationObject);
    res.status(200).json(newRelation);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.post('/', createNewRelation);

module.exports = router;
