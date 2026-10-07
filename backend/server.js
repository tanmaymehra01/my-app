const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST || '192.168.100.137',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Test@1234',
    database: process.env.DB_NAME || 'signup_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }

    console.log('Connected to MySQL database.');
    connection.release();
});

app.post('/signup', (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({
            error: 'Username and email are required'
        });
    }

    const query = 'INSERT INTO users (username, email) VALUES (?, ?)';

    db.query(query, [username, email], (err, result) => {
        if (err) {
            console.error('Database query failed:', err.message);

            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            id: result.insertId,
            username: username,
            email: email
        });
    });
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(5000, '0.0.0.0', () => {
    console.log('Backend running on port 5000');
});
