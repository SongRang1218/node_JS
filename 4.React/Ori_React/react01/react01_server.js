const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const _path = path.join(__dirname, '/build/');

app.use('/', express.static(_path));

// app.get('/', (req, res) => {
//     res.sendFile(_path + 'index.html');
// });
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
