const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "",
    // Your password
    password: "",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
});