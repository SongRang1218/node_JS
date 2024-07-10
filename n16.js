const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const app = express();
const port = 3000;
const _path = path.join(__dirname, '/');
app.use(logger('tiny'));
app.use();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
