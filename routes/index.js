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

    const deviceId = req.query.device;

    const resultPayload = {
      device: deviceId,
      results: [
        {
          parameter: 'pH',
          value: data.pH,
        },
        {
          parameter: 'moisture',
          value: data.moisture,
        },
        {
          parameter: 'temperature',
          value: data.temperature,
        },
      ],
    };
    const resultAPI = `https://chingalo.site/soil-analysis/api/results`;

    const results = await axios.post(resultAPI, resultPayload);
    const deviceDetails = await axios.get(
      `https://chingalo.site/soil-analysis/api/devices/`,
    );

    const url = `https://us-central1-soil-test-api.cloudfunctions.net/app/api/save?pH=${data.pH}&moisture=${data.moisture}&temperature=${data.temperature}&user=${deviceDetails.user.username}$location=${deviceDetails.user.region}`;

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
