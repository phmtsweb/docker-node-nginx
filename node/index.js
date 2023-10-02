const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:8080'
}))

const PORT = 3333;

const config = {
    host: 'mysql_db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config);

const createSql = `CREATE TABLE IF NOT EXISTS people(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    
)`;

connection.query(createSql);

const insertSql = `INSERT INTO people(name) 
                    values('Pedro'),
                    ('João'),
                    ('Maria')
                    `;


const selectSql = `SELECT * FROM people`;

connection.query(selectSql, (err, result) => {
    if (err) console.error(err);
    else if (result?.length === 0) {
        connection.query(insertSql);
    }
});


app.get('/', (_, res) => {
    connection.query(selectSql, (err, result) => {
        if (err) {
            return res.send('Something went wrong');
        }
        const people = result.map(person => `<li>${person.name}</li>`);
        res.setHeader('Content-Type', 'text/html');
        res.send(`<h1>Full Cycle Rocks!</h1>
                        <ul>
                            ${people.join(' ')}
                        </ul>`);
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})