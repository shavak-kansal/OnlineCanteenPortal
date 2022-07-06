import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, Grid, TextField, Button, Typography, Rating } from '@mui/material';

const style = {
  width: '100%',
  maxWidth: '100%',
  bgcolor: 'background.paper',
  margin: 'auto',
  textAlign: 'center',
};

const spacedboxes = {m:2 , padding:2 , border: 1, borderRadius: 0, boxShadow: 1};
const miniboxes = { m:0 , padding:1 , border: 1, borderRadius: 0, boxShadow: 1};

const VendorProfileDisplay = props => {

    const [FoodItemsList, setFoodItemsList] = useState([]);

    const [FoodItemName, setFoodItemName] = useState("");
    const [FoodItemPrice, setFoodItemPrice] = useState("");
    const [FoodItemVeg, setFoodItemVeg] = useState(true);
    const [FoodTagsList, setFoodTagsList] = useState(["POPULAR", "CHEAP", "EXPENSIVE"]);
    const [FoodTagsListEnabled, setFoodTagsListEnabled] = useState([true, true, true]);
    const [FoodItemAddons, setFoodItemAddons] = useState([]);
    const [FoodItemAddonsPrice, setFoodItemAddonsPrice] = useState([]);

    const [FoodUpdateName, setFoodUpdateName] = useState("");
    const [FoodUpdatePrice, setFoodUpdatePrice] = useState("");
    const [FoodUpdateVeg, setFoodUpdateVeg] = useState(true);
    const [FoodUpdateTagsList, setFoodUpdateTagsList] = useState(["POPULAR", "CHEAP", "EXPENSIVE"]);
    const [FoodUpdateTagsListEnabled, setFoodUpdateTagsListEnabled] = useState([true, true, true]);

    const handleTagChange = (index) => {
        let newArr = [...FoodTagsListEnabled];
        console.log("changing " + index + " to " + !newArr[index]);
        console.log(newArr);
        newArr[index] = !newArr[index];
        console.log(newArr);
        setFoodTagsListEnabled(newArr);
    };

    const handleTagUpdateChange = (index) => {
        let newArr = [...FoodUpdateTagsListEnabled];
        console.log("changing 1 " + index + " to " + !newArr[index]);
        console.log(newArr);
        newArr[index] = !newArr[index];
        console.log(newArr);
        setFoodUpdateTagsListEnabled(newArr);
    };

    const DisplayFoodItems = () => {
        console.log("Getting food items");
        let newArr = [];
        let newArr2 = [];
        axios
            .get("http://localhost:4000/food/", null)
            .then((response) => {
                console.log("Response data");
                console.log(response.data);
                newArr = response.data;

                newArr.map((foodItem) => {
                    if(foodItem.shop === props.loggedInUser.shop) {
                        newArr2.push(foodItem);
                    }
                });

                setFoodItemsList(newArr2);
            });
    };

    useEffect(() => {
        let foodList = [];
        let foodGot = false
        axios
        .get("http://localhost:4000/food/")
        .then((response) => {
            foodList = response.data.slice();
            
            let newArr = [];

            foodList.map((food) => {
                if(food.shop == props.loggedInUser.shop)
                    newArr.push(food);
            });

            setFoodItemsList(newArr);
        });

    }, []);

    const onSubmitFoodItem =( () => {
        let tagsList = [];

        FoodTagsListEnabled.map((enabled, index) => {
            if(enabled)
                tagsList.push(FoodTagsList[index]);
        });
        
        let newFoodItem = {
            name: FoodItemName,
            price: FoodItemPrice,
            veg: FoodItemVeg ? 1 : 0,
            shop: props.loggedInUser.shop,
            tags: tagsList,
            addons: FoodItemAddons,
            addonsPrice: FoodItemAddonsPrice
        };

        

        console.log("New Food Item is : ");
        console.log(newFoodItem);

        axios 
        .post("http://localhost:4000/food/add", newFoodItem)
        .then((response) => {
            console.log("Response is : ");
            console.log(response.data);
            setFoodItemAddonsPrice([]);
            setFoodItemAddons([]);
        });
    });

    const onUpdateFoodItem =( (index) => {
        return (() => {
            let tagsList = [];

            FoodUpdateTagsListEnabled.map((enabled, index) => {
                if(enabled)
                    tagsList.push(FoodUpdateTagsList[index]);
            });

            let newFoodItem = {
                id : FoodItemsList[index]._id,
                name: FoodUpdateName,
                price: FoodUpdatePrice,
                veg: FoodUpdateVeg ? 1 : 0,
                shop: props.loggedInUser.shop,
                rating: FoodItemsList[index].rating,
                addons: FoodItemsList[index].addons,
                tags: tagsList
            };

            

            console.log("New Updated Food Item is : ");
            console.log(newFoodItem);

            axios 
            .post("http://localhost:4000/food/foodUpdate", newFoodItem)
            .then((response) => {
                console.log("Response is : ");
                console.log(response.data);

                let newArr = [...FoodItemsList];
                newArr[index] = newFoodItem;
                setFoodItemsList(newArr);
            });
        });
    });

    const onDeleteFoodItem = ((index) => {
        return (() => {
            let newFoodItem = {
                id : FoodItemsList[index]._id,
                name: FoodItemsList[index].name,
                price: FoodItemsList[index].price,
                veg: FoodItemsList[index].veg,
                shop: props.loggedInUser.shop,
                rating: FoodItemsList[index].rating,
                addons: FoodItemsList[index].addons,
                tags: FoodItemsList[index].tags
            }; 

            //let newFoodItem = FoodItemsList[index];

            let newArr = [...FoodItemsList];
            newArr.splice(index, 1);
            setFoodItemsList(newArr);
            
            //FoodItemsList.splice(index, 1);

            console.log("New Deleted Food Item is : ");
            console.log(newFoodItem);

            axios 
            .post("http://localhost:4000/food/delete", newFoodItem)
            .then((response) => {
                console.log("Response is : ");
                console.log(response.data);
            });
        });
    });

    function handleFoodItemNameChange(e) {
        setFoodItemName(e.target.value);
    }

    function handleFoodItemPriceChange(e) {
        setFoodItemPrice(e.target.value);
    }

    function handleFoodUpdateNameChange(e) {
        setFoodUpdateName(e.target.value);
    }

    function handleFoodUpdatePriceChange(e) {
        setFoodUpdatePrice(e.target.value);
    }

    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newOpening, setNewOpening] = useState("");
    const [newClosing, setNewClosing] = useState("");

    const onChangeNewName = (event) => {
        setNewName(event.target.value);
    };

    const onChangeNewPhone = (event) => {
        setNewPhone(event.target.value);
    };

    const onChangeNewOpening = (event) => {
        setNewOpening(event.target.value);
    };

    const onChangeNewClosing = (event) => {
        setNewClosing(event.target.value);
    };

    const onUpdateNewName = () => {
        let user = props.loggedInUser;
        
        user.manager = newName !== "" ? newName : user.manager;
        user.phone = newPhone !== "" ? newPhone : user.phone;
        user.opening = newOpening !== "" ? newOpening : user.opening;
        user.closing = newClosing !== "" ? newClosing : user.closing;

        props.setLoggedInUser(user);

        setNewName("");
        setNewPhone("");
        setNewOpening("");
        setNewClosing("");

        axios
        .post("http://localhost:4000/user/vendorUpdate", user)
        .then((response) => {
            console.log("Response data vendor updation");
            console.log(response.data);
        });

    };

    const [AddonName, setAddonName] = useState("");

    const onChangeAddonName = (event) => {
        setAddonName(event.target.value);
    };

    const [AddonPrice, setAddonPrice] = useState(0);

    const onChangeAddonPrice = (event) => {
        setAddonPrice(event.target.value);
    };

    const onAddAddon = () => {
        let newArr = FoodItemAddons.slice();
        newArr.push(AddonName);
        setFoodItemAddons(newArr);
        setAddonName("");
        
        newArr = FoodItemAddonsPrice.slice();
        newArr.push(AddonPrice);
        setFoodItemAddonsPrice(newArr);
        setAddonPrice(0);
    };



    return (
        <div>
            <Grid container align={"center"} spacing={2} sx={spacedboxes}>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={DisplayFoodItems}>DISPLAY FOOD ITEMS</Button>
                </Grid>

                <Grid item xs={12}>
                    {FoodItemsList.map((food, index) => (
                        <Grid container  sx={{ m:2 , padding:2 , border: 1, borderRadius: 0, boxShadow: 1}}>
                            <Grid item xs={3} sx={miniboxes}>
                                <ListItemText primary="NAME" secondary={food.name} />
                            </Grid>
                            <Grid item xs={3} sx={miniboxes}>
                                <ListItemText primary="PRICE" secondary={food.price} />
                            </Grid>
                            <Grid item xs={4} sx={miniboxes}>
                                <Typography component="legend">FOOD RATING</Typography>
                                <Rating name="read-only" value={food.rating} readOnly />
                            </Grid>
                            <Grid item xs={2} sx={miniboxes}>
                                <FormControlLabel control={<Checkbox checked =  {food.veg ? true : false}/>} label="Veg" />
                            </Grid>
                            <Grid item xs={5} sx={miniboxes}>
                                <Typography component="legend">FOOD TAGS</Typography>
                                <div>
                                    {food.tags.map((tag, index) => (
                                        <Button sx={{ margin: 1 , p:1}} variant="outlined">{tag}</Button>
                                    ))}
                                </div>
                            </Grid>
                            <Grid item xs={5} sx={miniboxes}>
                                <Typography component="legend">FOOD ADD-ONS</Typography>
                                <div>
                                    {food.addons.map((addon, index) => (
                                        <Button sx={{ margin: 1 , p:1}} variant="outlined">{addon}</Button>
                                    ))}
                                </div>
                            </Grid>
                            <Grid item xs={2} sx={miniboxes}>
                                <Typography component="legend">SHOP : {food.shop}</Typography>
                            </Grid>
                            <Grid container item xs={12} sx={miniboxes}>
                                <Grid item xs={12}>
                                    <Typography component="legend">UPDATE FOOD ITEM</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField id="outlined-basic" label="Food Item Name" variant="outlined" value={FoodUpdateName} onChange={handleFoodUpdateNameChange}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField id="outlined-basic" label="Food Item Price" variant="outlined" value={FoodUpdatePrice} onChange={handleFoodUpdatePriceChange}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControlLabel control={<Checkbox checked={FoodUpdateVeg} onChange={() => setFoodUpdateVeg(!FoodUpdateVeg)} />} label="Veg" />
                                </Grid>
                                <Grid item xs={3}>
                                    {FoodUpdateTagsList.map((tag, index) => (
                                        <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                checked={FoodUpdateTagsListEnabled[index]}
                                                onChange={() => handleTagUpdateChange(index)}
                                            />} 
                                        label={tag} />
                                    ))}
                                </Grid>
                                <Grid item xs={12}>
                                    <button onClick={onUpdateFoodItem(index)}>Update Food Item</button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="legend">DELETE FOOD ITEM</Typography>
                                <button onClick={onDeleteFoodItem(index)}>Delete Food Item</button>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText primary="Manager Name" secondary={props.loggedInUser.manager}/>
                </ListItem>
                <Divider />
                <ListItem button divider>
                    <ListItemText primary="Shop Name" secondary={props.loggedInUser.shop}/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Contact Email" secondary={props.loggedInUser.email}/>
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary="Contact Phone" secondary={props.loggedInUser.phone}/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Opening Time" secondary={props.loggedInUser.opening}/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Closing Time" secondary={props.loggedInUser.closing}/>
                </ListItem>
            </List>

            <Grid container item xs={12} sx={spacedboxes}>
                <Grid item xs={12}>
                    <Typography component="legend">UPDATE USER DETAILS</Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="New Manager Name" variant="outlined" value={newName} onChange={onChangeNewName}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="New Phone" variant="outlined" value={newPhone} onChange={onChangeNewPhone}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="New Opening" variant="outlined" value={newOpening} onChange={onChangeNewOpening}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="New Closing" variant="outlined" value={newClosing} onChange={onChangeNewClosing}/>
                </Grid>
                <Grid item xs={3}>
                    <button onClick={onUpdateNewName}>Update Vendor Details</button>
                </Grid>
            </Grid>

            <Grid container align={"center"} spacing={2} sx={spacedboxes}>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="Food Item Name" variant="outlined" value={FoodItemName} onChange={handleFoodItemNameChange}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="Food Item Price" variant="outlined" value={FoodItemPrice} onChange={handleFoodItemPriceChange}/>
                </Grid>
                <Grid item xs={3}>
                    <FormControlLabel control={<Checkbox checked={FoodItemVeg} onChange={() => setFoodItemVeg(!FoodItemVeg)} />} label="Veg" />
                </Grid>
                <Grid item xs={3}>
                    {FoodTagsList.map((tag, index) => (
                        <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={FoodTagsListEnabled[index]}
                                onChange={() => handleTagChange(index)}
                            />} 
                        label={tag} />
                    ))}
                </Grid>
                <Grid container align={"center"} spacing={2} sx={miniboxes}>
                    <Grid item xs={12}>
                            {FoodItemAddons.map((addon, index) => (
                                <Button sx={{ margin: 1 , p:1}} variant="outlined">{addon + " : " + FoodItemAddonsPrice[index]}</Button>    
                            ))}
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="outlined-basic" variant="outlined" value={AddonName} onChange={onChangeAddonName}/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="outlined-basic" variant="outlined" value={AddonPrice} onChange={onChangeAddonPrice}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={onAddAddon}>Add Addon</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <button onClick={onSubmitFoodItem}>Add Food Item</button>
                </Grid>
            </Grid>  


        </div>
    );
};

export default VendorProfileDisplay;