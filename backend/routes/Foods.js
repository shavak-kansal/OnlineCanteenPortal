var express = require("express");
var router = express.Router();

// Load User model
const Food = require("../models/Food");

// GET request 
// Getting all the food items
router.get("/", function(req, res) {
    Food.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.post("/add", (req, res) => {
    
    const newFood = new Food({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        veg: req.body.veg,
        addons: req.body.addons,
        addonsPrice: req.body.addonsPrice,
        tags: req.body.tags,
        shop: req.body.shop
    });

    newFood.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});    

router.post("/reset", (req, res) => {
    
    Food.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully deleted all food items");
            res.status(200).json({message: "Successfully deleted all the food items"});
        }
    });
}); 

router.get("/getById", (req, res) => {
    
    Food.findOne({_id: req.body.foodid}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(user);
        }
    });
});

router.post("/foodUpdate", (req, res) => {
    Food.findOneAndUpdate({_id : req.body.id},{name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        veg: req.body.veg,
        addons: req.body.addons,
        tags: req.body.tags,
        shop: req.body.shop})
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: "User not found",
                });
            }
            else{
                res.json(user);
                return user;
            }
    });
});

router.post("/delete", (req, res) => {
    Food.findOneAndDelete({_id : req.body.id})
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

