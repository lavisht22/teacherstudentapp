const express = require('express');
const { checkJwt } = require('../../helpers/auth0');

const router = express.Router();

const userRoutes = require('./user');
const appRoutes = require('./app');

const { fetchUserProfile } = require('../../lib/user');

const adminRoutes = require('./admin/index');
const teacherRoutes = require('./teacher');

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

router.use(async (req, res, next) => {
  const userProfile = await fetchUserProfile(req.user.sub);
  req.user.profile = userProfile;
  next();
});

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/teacher', teacherRoutes);

module.exports = router;
