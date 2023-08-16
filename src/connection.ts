const mysql = require('mysql2');

const CONNECTION = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'bot'
});