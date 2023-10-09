const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password')
});

const JWT_SECRET = 1236224523516;

app.post('/forgot-password', (req, res, next) => {
    const{ email } = req.body;
    res.send(email);

    const secret = JWT_SECRET + user.password;
    const payload = {
        email: user.email,
        id: user.id
    }
    const token = jwt.sign(payload, secret, {expiresIn: '15m'})
    const link = 'http://localhost:3000/reset-password/${user.id}/${token}'
});

app.get('/reset-password', (req, res, next) => { });

app.post('/reset-password', (req, res, next) => { });

app.listen(3000, () => console.log('@ http://localhost:3000'));