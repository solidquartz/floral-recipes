const db = require('../../configs/db.config');

const getAllFlowers = () => {
  return db.query("SELECT * FROM flowers;")
    .then(data => {
      return data.rows;
  })
};


module.exports = {getAllFlowers}