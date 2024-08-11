const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'banner_db',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/banner', (req, res) => {
    const query = 'SELECT * FROM banners WHERE id = 1';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

app.post('/banner', (req, res) => {
    const { description, timer, link, is_visible } = req.body;
    const query = `
        UPDATE banners 
        SET description = ?, timer = ?, link = ?, is_visible = ?
        WHERE id = 1
    `;
    db.query(query, [description, timer, link, is_visible], (err) => {
        if (err) throw err;
        const selectQuery = 'SELECT * FROM banners WHERE id = 1';
        db.query(selectQuery, (err, result) => {
            if (err) throw err;
            res.send(result[0]);
        });
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
