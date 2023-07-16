const { Pool } = require('pg');
const dotenv  = require("dotenv").config();

const dbPassword = process.env.dbPassword
const pool = new Pool({
  user: 'postgres',
  password: dbPassword,
  host: 'localhost',
  port: 5432,
  database: 'edumove',
});

module.exports = pool;



// const dbConfig = new Pool({
//   user: 'postgres', 
//   password: 'Fresh@123',      
//   host: 'localhost', 
//   port: 5432,        
//   database: 'edumove', 
// });



// dbConfig.connect();

// dbConfig.query(`Select * from drivers`, (err, res) => {
//     if(!err){
//         console.log(res.rows);
//     }else{
//         console.log(err);
//     }
//     dbConfig.end()
// })