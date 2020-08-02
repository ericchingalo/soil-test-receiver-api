var express = require('express');
var router = express.Router();

/* Saving the results to firebase */
router.get('/reults', (req, res, next) => {
  (async () => {
    const data = {
      pH: Number(req.query.pH),
      moisture: Number(req.query.moisture),
      temperature: Number(req.query.temperature),
    };

    try {
      return res.status(200).send({ message: 'created', data });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

module.exports = router;
