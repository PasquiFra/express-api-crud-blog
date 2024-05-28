// import del modulo path
const path = require("path");

// Setup server with express
const express = require("express");
const app = express();
const port = 3000;

// import dei router
const blogRouter = require("./routers/blogRouter.js");

// Import dei middlewares
const routersLogger = require("./middlewares/routersLogger.js")
const routeNotFound = require("./middlewares/routeNotFound.js")

//aggiungo il middleware che si occupa della cartella public
app.use(express.static('./public'));

// questo comando permette di ricevere chiamate in post/put e di leggerne il body
app.use(express.json());

// console log delle rotte prese
app.use(routersLogger);

// Middleware per parsare application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//! ROUTES: lista delle rotte

// Imposto la rotta Home e restituisco una vista standard
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    res.sendFile(filePath);
})

app.use('/posts', blogRouter);

//? SE la rotta richiesta non è settata restituisco un errore 
app.use(routeNotFound);

app.listen(port, () => {
    console.log(`Server avviato alla porta http://localhost:${port}.`);
})