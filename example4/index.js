const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname, '/main.js'));
});

app.get('/worker', function(req, res) {
    res.sendFile(path.join(__dirname, '/worker.js'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});