
// Setup server with express
const express = require("express");
const app = express();
const port = 3000;

//aggiungo il middleware che si occupa della cartella public
//app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server avviato alla porta http://localhost:${port}.`);
})