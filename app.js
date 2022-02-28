const express = require('express')
const app = express();
const session = require('express-session');
const port = 3000
const router = require('./router')
const Controller = require('./controllers/loginController');
const ControllerRegis = require('./controllers/registerController');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'rahasia mas susila',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.get('/register', ControllerRegis.getRegisterForm) //menampilkan form register
app.post('/register', ControllerRegis.postRegister) //post registe
app.get('/login', Controller.getLogin)
app.post('/login', Controller.postLogin)

app.use(function (req, res, next) {
  // console.log(req.session)
  if (!req.session.userId) {
    const error = 'Please login first!'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})
app.get('/logout', Controller.postLogout)

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

