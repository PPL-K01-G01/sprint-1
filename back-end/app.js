const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/user-routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const db = require('./config/database');

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_DIALECT);
console.log(process.env.DB_HOST);

db.authenticate()
    .then(() => {
        console.log('Database connected...');
        return db.sync({alter : true});
    })
    .catch(err => console.log('Error: ' + err));


app.use("/api", userRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
