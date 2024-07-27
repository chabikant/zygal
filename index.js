const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const PORT = 3000;

// Useful Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine Setup 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Load data from JSON file
const loadData = async () => {
    const dataPath = path.join(__dirname, 'data.json');
    try {
        const data = await fs.readJson(dataPath);
        return data;
    } catch (err) {
        return {};
    }
};

// Save data to JSON file
const saveData = async (data) => {
    const dataPath = path.join(__dirname, 'data.json');
    await fs.writeJson(dataPath, data, { spaces: 3 });
};

// Routes

// Api endpoint for landing page
app.get('/', async (req, res) => {
    const data = await loadData();
    res.render('index', { data });
});

// Api endpoint for get the data 
app.get('/data', async (req, res) => {
    const data = await loadData();
    res.json(data);
});

// Api endpoint for submitting the data
app.post('/submit', async (req, res) => {
    const { number } = req.body;
    const num = parseInt(number, 10);

    if (num >= 1 && num <= 100) {
        const data = await loadData();
        data[num] = (data[num] || 0) + 1;
        await saveData(data);
        res.redirect('/');
    } else {
        res.status(400).send('Number must be between 1 and 100.');
    }
});

// Api endpoint for generating the chart 
app.get('/chart.js', async(req, res) => {
    await res.sendFile(path.join(__dirname, 'views', 'chart.js'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
