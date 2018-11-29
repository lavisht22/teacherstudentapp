const express = require('express');

const classLib = require('../../../lib/admin/class');

const router = express.Router();

async function createNewClass(req, res) {
  const classObject = {
    name: req.body.name,
    branch: req.body.branch,
  };

  try {
    const newClass = await classLib.createNewClass(classObject);
    res.status(200).json(newClass);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.post('/', createNewClass);

module.exports = router;
