// import del modulo path
const path = require("path");

// Setup server with express
const express = require("express");
const app = express();
const port = 3000;

//aggiungo il middleware che si occupa della cartella public
//app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));

// Imposto la rotta Home e restituisco una vista standard
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    res.sendFile(filePath);
})

app.listen(port, () => {
    console.log(`Server avviato alla porta http://localhost:${port}.`);
})