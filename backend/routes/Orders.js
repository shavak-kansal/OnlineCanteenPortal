var express = require("express");
var router = express.Router();

// Load User model
const Order = require("../models/Orders");

// GET request 
// Getting all the food items
router.get("/", function(req, res) {
    Order.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.post("/add", function(req,res){
    const newOrder = new Order({
        foodId: req.body.foodId,
        userId: req.body.userId,
        quantity: req.body.quantity,
        status: req.body.status,
        time: req.body.time,
        cost: req.body.cost,
        shop: req.body.shop,
        rating: req.body.rating
    });

    newOrder.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/reset", (req, res) => {
    //Order.collection.drop();

    Order.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully deleted all food orders");
            res.status(200).json({message: "Successfully deleted all the order items"});
        }
    });
}); 

router.post("/updateStatus", (req, res) => {
    Order.findOneAndUpdate({_id : req.body._id},{status: req.body.status})
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: "Food item not found",
                });
            }
            else{
                res.json(user);
                return user;
            }
    });
});

module.exports = router;

