const router = require('express').Router();
const flowers = require('../db/queries/flowers')

router.get('/', (req, res) => {
  flowers.getAllFlowers()
    .then(data => {
      res.json({ flowers: data });
  })
});

module.exports = router;