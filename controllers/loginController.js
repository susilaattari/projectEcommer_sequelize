const { User } = require('../models/index');
const bcrypt = require("bcryptjs");

class ControllerLogin {
  static getLogin(req, res) {
    const{error} = req.query
    res.render("loginPage", {error})
  }

  static postLogin(req, res) {
    // console.log(req.body);
    const { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password)
          if (isValidPassword) {
            req.session.userId = user.id
            req.session.role = user.roles
            return res.redirect('/')
          } else {
            const error = `Invalid username or password`
            return res.redirect(`/login?error=${error}`)
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
    // const {}
    // User.
  }

  static postLogout(req,res) {
    req.session.destroy((err)=>{
      if(err){
        res.send(err)
      }else{
        res.redirect('/login')
      }
    })
  }
}
module.exports = ControllerLogin