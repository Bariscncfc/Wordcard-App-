const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/application', (req, res) => {
    res.render('application');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/home', (req, res) => {
    res.render('home');
});

module.exports = router;