const express = require('express');
const data = require('./data.json');

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    const projects = data.projects;
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const project = data.projects[req.params.id];
    console.log(project);
    res.render('project', { project });
});

app.use((res, req, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Oops! Looks like the page doesn't exist!";
    next(err);
});

app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || "Oops! It seems as though something went wrong!";
    console.log(err);
    next(err);
});

app.listen(3000, () => {
    console.log('App listening at http://localhost:3000');
});