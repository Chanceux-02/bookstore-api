// import
const mysql = require('mysql');
require('dotenv').config();

//set up config
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
};

// make a pool of connection to handle many request 
const db = mysql.createPool(dbConfig);

//handle and execute query and export it to make it reusable
module.exports = (query, values)=>{
    return new Promise ((resolve, reject)=>{
        db.getConnection((err, sql)=>{
            if(err){
                console.log("Get connection error", err);
            }else{
                sql.query(query, values, (err, results)=>{
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                    sql.release();
                });
            }
        });

    });
}