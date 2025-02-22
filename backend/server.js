const express = require("express");
require("./src/config/dotenv");
require("./src/config/sequelize");

// const models = require('./src/models');
// require("./src/models/Associations")(models);

const app = express();
const port = process.env.PORT;
const cors = require("cors");

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // permite ambas as origens
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const routes = require("./src/router/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});