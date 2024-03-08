const express = require('express');
const { Pool } = require('pg'); // Import Pool from pg module
const app = express();
const port = 3000;

// PostgreSQL connection settings
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MedicineDeliveryAppDB',
    password: '1111',
    port: 5432,
});

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// Routes
app.get('/api/shops', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Shops');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/drugs', async (req, res) => {
    const shopId = req.query.shopId;

    try {
        let query = 'SELECT * FROM Drugs';
        let params = [];

        if (shopId && Number.isInteger(parseInt(shopId))) {
            query += ' WHERE ShopId = $1';
            params.push(shopId);
        }

        const { rows } = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/api/drugs/:id', async (req, res) => {
    const drugId = req.params.id;

    if (!Number.isInteger(parseInt(drugId))) {
        return res.status(400).json({ error: 'Invalid drug ID' });
    }

    try {
        const { rows } = await pool.query('SELECT * FROM Drugs WHERE Id = $1', [drugId]);

        // Check if drug was found
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Drug not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
