const db = require("../models");
const Feedback = db.feedback;
const User = db.user;
const Order = db.order;
const Product = db.product;


exports.editProfile = (req,res) => {

  const newDetails = {
    name: req.body.name,
    phone: req.body.phone_number
  }

  User.findOneAndUpdate({_id:  req.userId}, newDetails, (err, user) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
            });

  res.status(200).send({ message: "User profile updated!"});

}




exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.feedback = (req, res) => {

	const feedbackMsg = new Feedback({
		name: req.body.name,
    	email: req.body.email,
    	message: req.body.message
  	});

  feedbackMsg.save((err, feedback) => {
    if (err) {
     	res.status(500).send({ message: err });
    }else{
    	res.status(200).send("Feedback Received.");
    }
    return;
	});

}

exports.listFeedback = (req, res) => {
	Feedback.find({}).exec((err, feedback) => {
  		res.status(200).send(feedback);
	});
}

exports.listOrders = (req, res) => {
  Order.find({}).exec((err, order) => {
      res.status(200).send(order);
  });
}


exports.makeOrder = (req, res) => {

  User.findById(req.userId).exec((err, user) => { 
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const order = new Order({
        user: user._id,
        customer: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        },
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        area: req.body.area,
        paymentMethod: req.body.paymentMethod,
        card: {
          name: req.body.card.name,
          number: req.body.card.number,
          exp: req.body.card.exp,
          cvv: req.body.card.ccv
        },
        order: req.body.order
      });

      order.save((err, feedback) => {
        if (err) {
          res.status(500).send({ message: err });
        }
      });


      for (var i = 0; i < req.body.order.length; i++) {

         Product.findOneAndUpdate({_id:  req.body.order[i].product._id}, {$inc: { stock: req.body.order[i].amount*-1} }, (err, user) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
            });
      }

      res.status(200).send("Order Received.");
  });

}


