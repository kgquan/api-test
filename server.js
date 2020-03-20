const express = require('express');

const connectToDatabase = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectToDatabase();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Application started; listening on port ${PORT}`);
});