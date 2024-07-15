app.use(logger('tiny'));
app.use('/', express.static(_path));