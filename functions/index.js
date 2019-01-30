const functions = require('firebase-functions');

const cors = require('cors');
const express = require('express');
const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.get('/token/:id', (req, res) => {
    return res.json({
        name: `building ${req.params.id}`,
        description: `building ${req.params.id}`,
        image: `https://${req.headers.host}/block-cities/us-central1/api/${req.params.id}/image`
    });
});

app.get('/:id/image/random', async (request, response) => {
    return require('./image').generateRandomSVG(request, response);
});

app.get('/:id/image', async (request, response) => {
    return require('./image').generateRandomSVG(request, response);
});

app.get('/:base/:body/:roof/image', async (request, response) => {
    return require('./image').generateSVG(request, response);
});

app.get('/image/process', async (request, response) => {
    return require('./image').processSVG(request, response);
});

app.get('/stitch', async (request, response) => {
    return require('./image').processAndStack(request, response);
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

