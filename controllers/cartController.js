const { Cart, User, Product} = require('../models');
const formatRupiah = require('../helper/formatRupiah')
const nodeMail = require('../helper/nodeMailler');

class ControllerCart {

  static getCart(req, res) {
    // console.log(req.session);
    const { userId } = req.session
    Cart.findAll({
      where: {
        UserId: userId,
        status: "Uncheckout"
      },
      include:
        [
          {
            model: User,
            include: ["Profile"]
          },
          {
            model: Product
          }
        ]
    })
      .then(data => {
        // console.log(data[0].dataValues);
        let hargaTotal = 0
        data.forEach(el => {
          hargaTotal += el.Product.price
        })
        // console.log(hargaTotal);
        res.render("cartPage", { data, formatRupiah, hargaTotal })
      })
      .catch(err => {
        console.log(err);
      })
  }

  static postToCart(req, res) {
    const { userId } = req.session
    const { ProductId } = req.body
    // console.log(req.body);
    Cart.create({status: "Uncheckout", UserId: userId, ProductId})
    .then(_=> {
      // res.redirect("/cart")
    })
    .catch(err => {
      res.send(err)
    })
  }

  static deleteCart(req, res) {
    // console.log(req.params);
    const {id} = req.params
    Cart.destroy({where:{id}})
    .then(_=> {
      res.redirect("/cart")
    })
    .catch(err => {
      res.send(err)
    })
  }

  static updateCheckOut(req, res) {
    const { userId } = req.session 
    // console.log(userId);
    Cart.update({status:"Checkout"},{where: {status: "Uncheckout", UserId: userId}})
    .then( data =>{
      const id = userId
      User.findByPk(id)
      .then(dataCO => {
        nodeMail(dataCO.email)
      })
      res.redirect("/cart")
    })
    .catch(err => {
      res.send(err)
    })
  }
}
module.exports = ControllerCart