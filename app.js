const express = require('express');
const data = require('./data.json');

const app = express();

// Use the Pug View Enginge
app.set('view engine', 'pug');

// Link to static content
app.use('/static', express.static('public'));

// Home Page
app.get('/', (req, res) => {
    // Show projects in reverse order (newest projects first)
    const projects = data.projects.reverse();
    res.render('index', { projects });
});

// About Page
app.get('/about', (req, res) => {
    res.render('about');
});

// Project Page
app.get('/project/:id', (req, res) => {
    const projects = data.projects;
    const project = projects.find(project => project.id === +req.params.id);

    if (project) {
        res.render('project', { project });
    } else {
        // If there is no project at the specefied ID redirect to error page
        err.message = "Oops! Looks like that page doesn't exist!";
        res.redirect('/error');
    }
});

// 404 Error
app.use((res, req, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Oops! Looks like that page doesn't exist!";
    next(err);
});

// Global Error Handling
app.use((err, req, res, next) => {
    // If 404 Send to Page Not Found
    if (err.status === 404) {
        console.log(err.stack);
        return res.render('page-not-found', { error: err });
    }
    err.status = err.status || 500;
    err.message = err.message || "Oops! It seems as though something went wrong!";
    console.log(err.stack);
    res.render('error', { error: err });
});

app.listen(3000, () => {
    console.log('App listening at http://localhost:3000');
});