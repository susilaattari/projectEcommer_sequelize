const {User, Profile} = require('../models/index');

class ControllerRegister {

  static getRegisterForm(req,res){
    const {errors} = req.query
    res.render('registerPage', {errors})
  }

  static postRegister (req, res) {
    // console.log(req.body);
    const { email, name, dateOfBirth, password } = req.body
    User.create({email, password, roles: "User"}) // User Create
    .then(dataUser => {
      // console.log(dataUser);
      Profile.create({fullName: name, dateOfBirth, email, UserId: dataUser.dataValues.id})
    })
    .then(data => {
      res.redirect('/login')
    })
    .catch(err => {
      if (err.name == 'SequelizeValidationError') {
        let errors = []
        err.errors.forEach(e => {
          errors.push(e.message)
        })
        res.redirect(`/register?errors=${errors}`)
      }
    })
  }
}
module.exports = ControllerRegister