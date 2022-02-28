const {Product,Category} = require ('../models')
const formatRupiah = require('../helper/formatRupiah')

class homeController{
  static landingPage (req,res){
    let name = req.query.category
    if(name){
      Product.findAll({
        include : {
          model :Category,
          where :{name:name}
        }
      })
      .then(data =>{
        // res.send(data)
        res.render("productPage",{data, req, formatRupiah})
      })
      .catch(err =>{
        res.send(err)
        // console.log(err)
      })
    }else{
      Product.findAll({
        include : Category
      })
      .then(data =>{
        // res.send(data)
        res.render("productPage",{data, req, formatRupiah})
      })
      .catch(err =>{
        res.send(err)
        // console.log(err)
      })
    }
  }
}
module.exports = homeController 