var express = require('express');
const axios = require('axios');
var router = express.Router();

/* Saving the results to firebase */
router.get('/results', (req, res, next) => {
  (async () => {
    const data = {
      pH: Number(req.query.pH),
      moisture: Number(req.query.moisture),
      temperature: Number(req.query.temperature),
    };

    const url = `https://us-central1-soil-test-api.cloudfunctions.net/app/api/save?pH=${data.pH}&moisture=${data.moisture}&temperature=${data.temperature}`;

    try {
      axios
        .post(url, {})
        .then((response) => {
          return res.status(200).send({ message: 'created', data });
        })
        .catch((error) => {
          return res.status(500).send(error);
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

module.exports = router;
