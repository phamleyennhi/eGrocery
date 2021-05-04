const db = require("../models");
const Product = db.product;


exports.all = (req, res) => {
	Product.find({featured: 1}).exec((err, products) => {

  		res.status(200).send(products);
	});
};

exports.category = (req,res) => {

	const category = req.params.category;

	if(category == "bakery"){
		Product.find({category: "Bread & Bakery"}).exec((err, products) => {
	  		res.status(200).send(products);
		});
	}else if(category == "breakfast"){
		Product.find({category: "Breakfast & Cereal"}).exec((err, products) => {
	  		res.status(200).send(products);
		});
	}else if(category == "soups"){
		Product.find({category: "Canned Goods & Soups"}).exec((err, products) => {
	  		res.status(200).send(products);
		});
	}else if(category == "dairy"){
		Product.find({category: "Dairy, Eggs & Cheese"}).exec((err, products) => {
	  		res.status(200).send(products);
		});
	}else if(category == "grains"){
		Product.find({category: "Grains, Pasta & Sides"}).exec((err, products) => {
	  		res.status(200).send(products);
		});
	}else if(category == "fruit"){
		Product.find({category: "Fruit & Vegetables"}).exec((err, products) => {
	  		res.status(200).send(products);
		});
	}else if(category == "meat"){
		Product.find({category: "Meat"}).exec((err, products) => {
	  		res.status(200).send(products);
		});
	}else if(category == "snacks"){
		Product.find({category: "Cookies, Snacks & Candy"}).exec((err, products) => {
	  		res.status(200).send(products);
		});
	}else if(category == "imperfect"){
		Product.find({category: "Ugly"}).exec((err, products) => {
	  		res.status(200).send(products);
		});
	}else {
		res.status(404).send({message: "Category does not exist!"});
	}

};

exports.singleItem = (req, res) => {
	Product.find({_id: req.params.id}).exec((err, product) => {

  		res.status(200).send(product);
	});
};


exports.addProduct = (req, res) => {
	
 const product = new Product({
 	name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
    shortDesc: req.body.shortDesc,
    category: req.body.category,
    description: req.body.description,
    featured: req.body.featured,
    url: req.body.url
  });

  product.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Product added succesfully!" });

  });
 
};

exports.editProduct = (req, res) => {

	const id = req.params.id;
	const data = {
		name: req.body.name,
		stock: req.body.stock,
		price: req.body.price,
		shortDesc: req.body.shortDesc,
		category: req.body.category,
		featured: req.body.featured,
		description: req.body.description,
		url: req.body.url
	};


	Product.findOneAndUpdate({_id: id}, data, (err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		res.send({ message: "Product updated succesfully!" });
	});
};


exports.deleteProduct = (req, res) => {

	const id = req.params.id;

	Product.findOneAndDelete( {_id: id}, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }});

}


