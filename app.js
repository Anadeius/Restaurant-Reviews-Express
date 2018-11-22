const express = require('express');
const cors = require('cors');

const app = express();
const port = 1375;

app.use(cors());

app.use(express.static('legacy/dist'));

app.get('/restaurants/:id', (req, res) => {
	res.redirect(`/restaurant.html?id=${req.params.id}`);
});

app.listen (port, () => {
	console.log(`Restaurant Reviews listening on port ${port}`);
});

