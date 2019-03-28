const express = require('express');
const helmet = require('helmet');

const dishRouter = require('./routers/dishes-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send(
        `Navigate to /api/dishes on the URL to get all dishes and navigate to /api/recipes to get all recipes`
    );
});

server.use('/api/dishes', dishRouter);


const port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});