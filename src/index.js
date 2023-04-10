const express = require('express');
const connect = require('./config/database');
const { PORT } = require('./config/serverConfig');



const app = express();

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connect();
    console.log(`mongo db connected`);
})