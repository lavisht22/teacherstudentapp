const express = require('express');
const { checkJwt } = require('../../helpers/auth0');

const router = express.Router();

const userRoutes = require('./user');
const appRoutes = require('./app');

router.get('/', (req, res) => {
  res.json({ title: 'Lavish Thakkar' });
});

router.use('/app', appRoutes);
router.use(checkJwt);
router.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).json(err);
  } else {
    console.log('Next');
    next();
  }
});

router.use('/user', userRoutes);

module.exports = router;
