const router = require('express').Router();

router.get('/', (req, res) => {
  const cats = ['Spocky', 'Tali', 'Mr. Meows'];
  res.json(cats);
});

module.exports = router;