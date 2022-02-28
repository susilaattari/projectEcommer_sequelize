const { Category, Product } = require('../models/index');
const formatRupiah = require('../helper/formatRupiah')

class ControllerProduct {
  static getProductAdd(req, res) {
    // console.log(req.query);
    const{ errors } = req.query
    // console.log(errors);
    Category.findAll()
      .then(dataCategory => {
        // console.log(dataCategory);
        // console.log(errors);
        res.render("productAddPage", { dataCategory, errors })
      })
      .catch(err => {
        // console.log(err);
        
        res.send(errors)
      })
  }

  static postProductAdd(req, res) {
    // console.log(req.body);
    const { name, price, stock, imageUrl, description, CategoryId } = req.body
    Product.create({ name, price, stock, imageUrl, description, CategoryId })
      .then(newData => {
        // console.log(newData);
        res.redirect("/") //! lempar ke home (home: mas susila)
      })
      .catch(err => {
        if(err.name === 'SequelizeValidationError') {
          let errors = []
          err.errors.forEach(e => {
            errors.push(e.message)
          })
          res.redirect(`/product/add?errors=${errors}`)
        }
      })
  }

  static getProductDetail(req, res) {
    // console.log(req.params);
    const { productId } = req.params
    // console.log(productId);
    Product.findByPk(productId, {
      include: {
        model: Category
      }
    })
      .then(productById => {
        // console.log(productById);
        res.render("productDetailPage", { productById,formatRupiah })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getProductEdit(req, res) {
    // console.log(req.params, 'ini params')
    const id = req.params.productId
    const{ errors } = req.query
    // console.log(id, 'hasil ambil dari params');
    let dataEdit
    Product.findByPk(+id)
      .then(dataProduct => {
        dataEdit = dataProduct
      })
    Category.findAll()
      .then(dataCategory => {
        // console.log(dataEdit);
        // console.log(dataCategory);
        res.render("productEditPage", { dataEdit,  dataCategory, errors})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static postUpdateProduct(req, res) {
    // console.log(req.body);
    // console.log(req.params);
    const { productId } = req.params
    const {name, price, stock, imageUrl, description, CategoryId} = req.body
    Product.update({name, price, stock, imageUrl, description, CategoryId}, {
      where: {
        id: productId
      }
    })
    .then( data => {
      res.redirect("/")
    })
    .catch(err => {
      // console.log(err);
      if(err.name === 'SequelizeValidationError') {
        let errors = []
        err.errors.forEach(e => {
          errors.push(e.message)
        })
        res.redirect(`/product/${productId}/edit?errors=${errors}`)
      }
    })
  }

  static fiturDelete (req,res){
    let id = req.params.productId
    Product.destroy({
      where: {
        id: id
      }
    })
    .then(()=> {
      res.redirect(`/`)
    })
    .catch(err => {
      res.send(err)
    })
  }
}
module.exports = ControllerProduct