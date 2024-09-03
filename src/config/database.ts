import mysql from "mysql";

export const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'rosenberg',
  port : 3306
});

connection.connect((err)=>{
    console.log('error', err);
    console.log("Connection build successful");

    });
