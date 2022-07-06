var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Buyer = require("../models/Buyers");
const Vendor = require("../models/Vendors");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.get("/buyers", function(req, res) {
    Buyer.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.get("/vendors", function(req, res) {
    Vendor.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.post("/reset", (req, res) => {
	Buyer.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully deleted all buyers items");
        }
    });

    Vendor.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully deleted all vendors items");
        }
    });

    User.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully deleted all user items");
        }
    });

    res.status(200).json({message: "Successfully deleted all the type of users"});
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


router.post("/registerVendor", (req, res) => {
    const newUser = new Vendor({
        manager: req.body.manager,
        shop: req.body.shop,
        email: req.body.email,
        phone: req.body.phone,
        opening: req.body.opening,
        closing: req.body.closing,
        password: req.body.password
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log('Hello World');
            console.log(err);
            res.status(400).send(err);
        });
});

router.post("/registerBuyer", (req, res) => {
    const newUser = new Buyer({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        batch: req.body.batch,
        favorites: req.body.favorites,
        wallet: 0
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/loginVendor", (req, res) => {
	const email = req.body.email;
	// Find user by email
	Vendor.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.json(user);
            return user;
        }
	});
});

router.post("/loginBuyer", (req, res) => {
	const email = req.body.email;
	// Find user by email
	Buyer.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.json(user);
            return user;
        }
	});
});


router.post("/login", (req, res) => {
    var userres = 0;

	const email = req.body.email;
	// Find user by email
    Buyer.findOne({ email }).then(buyer => {
		// Check if user email exists
        if(buyer){
            console.log('Hello World buyer');
            
            userres._id = mongoose.Types.ObjectId();
            userres.isNew = true; //<--------------------IMPORTANT
            userres.save(callback);

        }
	});

    Vendor.findOne({ email }).then(vendor => {
        // Check if user email exists
        if (vendor){

            console.log('Hello World vendor');
            
            //if(!userres)
            userres._id = mongoose.Types.ObjectId();
            userres.isNew = true; //<--------------------IMPORTANT
            userres.save(callback);
        }
    });
    console.log(userres);
    if (!userres) {
        return res.status(404).json({
            error: "Email not found",
        });
    }
    else {
        res.send("Email Found");
        return userres;
    }
    function found(user){
        if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.send("Email Found");
            return user;
        }
    }

    Buyer.findOne({ email }).then(found());
    Vendor.findOne({ email }).then(found());
});

router.post("/favoritesUpdate", (req, res) => {
    Buyer.findOneAndUpdate({email : req.body.email},{favorites : req.body.favorites}).then(user => {
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

router.post("/walletUpdate", (req, res) => {
    Buyer.findOneAndUpdate({email : req.body.email},{wallet : req.body.wallet}).then(user => {
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

router.post("/buyerUpdate", (req, res) => {
    Buyer.findOneAndUpdate({email : req.body.email},{name : req.body.name, age : req.body.age, batch : req.body.batch}).then(user => {
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
})

router.post("/vendorUpdate", (req, res) => {
    Vendor.findOneAndUpdate({email : req.body.email},{manager : req.body.manager, phone : req.body.phone, opening : req.body.opening, closing : req.body.closing}).then(user => {
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
})

module.exports = router;

