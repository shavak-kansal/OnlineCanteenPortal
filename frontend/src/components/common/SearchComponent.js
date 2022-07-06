import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './general.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const spacedboxes = {m:2 , padding:2 , border: 1, borderRadius: 0, boxShadow: 1};
const miniboxes = { m:0 , padding:1 , border: 1, borderRadius: 0, boxShadow: 1};
const SearchComponent = props => {
    /* var ShopList = [
        {   
            Name : 'BBC',
            Enabled : true,
        },
        {
            Name : 'VC',
            Enabled : true,
        }, 
        {
            Name : 'JC',
            Enabled : false,
        }]; */
    const [ShopList, setShopList] = useState([]);
    const [ShopListEnabled, setShopListEnabled] = useState([]);

    const [ShopListNew, setShopListNew] = useState([]);
    const [ShopListNewEnabled, setShopListNewEnabled] = useState([]);
    
    const [QuantityList, setQuantityList] = useState([]);
    const [FoodItems, setFoodItems] = useState([]);
    const [SearchName, setSearchName] = useState('Enter Search Name');
    
    const [FoodTagsList, setFoodTagsList] = useState(["POPULAR", "CHEAP", "EXPENSIVE"]);
    const [FoodTagsListEnabled, setFoodTagsListEnabled] = useState([true, true, true]);

    const [SortingCriteria, setSortingCriteria] = useState(0); // 0 = price, 1 = rating
    const [SortingOrder, setSortingOrder] = useState(0);    // 0 for ascending, 1 for descending
    
    useEffect(() => {

        axios 
        .get("http://localhost:4000/user/vendors")
        .then((response) => {
            console.log("Response is : ");
            console.log(response);
            
            let newArr = response.data;

            let newArr2 = [];
            let newArr2Enabled = [];

            newArr.map((shop) => {
                newArr2.push(shop);
                newArr2Enabled.push(true);
            });

            console.log("newArr2 is : ");
            console.log(newArr2);
            console.log(newArr2Enabled);

            setShopList(newArr2);
            setShopListNew(newArr2Enabled);

            console.log("Shop items are after setting");
            console.log(ShopList);

            console.log("Shop items enabled are");
            console.log(ShopListNew);
            //setQuantityList(Array(newArr.length).fill(0));
        });
    }, []);

    const onChangeSearchName = (event) => {
        setSearchName(event.target.value);
    };

    const handleChange = (index) => {
        let newArr = [...ShopListEnabled];
        console.log("changing " + index + " to " + !newArr[index]);
        console.log(newArr);
        newArr[index] = !newArr[index];
        console.log(newArr);
        setShopListEnabled(newArr);
    };

    const handleTagChange = (index) => {
        let newArr = [...FoodTagsListEnabled];
        console.log("changing " + index + " to " + !newArr[index]);
        console.log(newArr);
        newArr[index] = !newArr[index];
        console.log(newArr);
        setFoodTagsListEnabled(newArr);
    };

    const handleQuantityList = (event, index) => {
        let newArr = [...QuantityList];
        console.log(newArr);
        newArr[index] = event.target.value;
        console.log(newArr);
        setQuantityList(newArr);
    };


    function fixingFavorites(index){
        return () => {
            console.log("Favorites : " + index);
            console.log("Printing user favorites");
            console.log(FoodItems[index]._id);
            props.loggedInUser.favorites.push(FoodItems[index]._id);
            console.log(props.loggedInUser.favorites);


            axios
            .post("http://localhost:4000/user/favoritesUpdate", props.loggedInUser)
            .then((response) => {
                console.log("Response data");
                console.log(response.data);
            });
        };
    }

    const onHandleSearch = (event) => {
        axios
            .get("http://localhost:4000/food", null)
            .then((response) => {
                console.log(response);
                //setFoodItems(response.data);
                let newArr = response.data;
                console.log("Food items are");
                console.log(newArr);
                
                if(true) {
                    newArr = newArr.filter(item => item.name.toLowerCase().includes(SearchName.toLowerCase()));
                    console.log("Filtered food items are");
                    console.log(newArr);
                    
                    let enabledTags = [];

                    FoodTagsListEnabled.map((val, index) => {
                        if(val)
                            enabledTags.push(FoodTagsList[index]);
                    });

                    console.log(enabledTags);

                    let newNewArr = [];

                    newArr.map((food, index) => {
                        const intersection = enabledTags.filter(element => food.tags.includes(element));    

                        console.log("Intersection is ");
                        console.log(intersection);
                        if(intersection.length)
                            newNewArr.push(food);
                    });
                    
                    
                    newArr = newNewArr;

                    newNewArr = [];

                    let enabledShops = [];
                    
                    ShopListEnabled.map((val, index) => {
                        if(val)
                            enabledShops.push(ShopList[index].shop);
                    });

                    console.log("Enabled shops are");
                    console.log(enabledShops);

                    console.log("Before filtering");
                        console.log(newArr);

                    newArr.map((food, index) => {
                    
                        if(enabledShops.includes(food.shop))
                            newNewArr.push(food);
                    });

                    console.log("After filtering");
                        console.log(newNewArr);

                    newArr = newNewArr;
                }

                setQuantityList(Array(newArr.length).fill(0));
                setFoodItems(newArr);
                setSearchName('');
            });
    };

    function handleBuy(index){
        return () => {

            let orderCost = QuantityList[index] * FoodItems[index].price;

            var ret = props.handbleBuyWallet(orderCost);

            if(ret == -1){
                alert("Insufficient funds");
                return;
            }

            const newOrder = {
                foodId : FoodItems[index]._id,
                quantity : QuantityList[index],
                userId : props.loggedInUser._id,
                cost: QuantityList[index] * FoodItems[index].price,
                time: Date().toLocaleString(),
                status: "PLACED",
                shop: FoodItems[index].shop,
                rating: 0
            };

            console.log("New order object is");
            console.log(newOrder);

            axios
                .post("http://localhost:4000/order/add", newOrder)
                .then((response) => {
                    console.log("Response data for adding order");
                    console.log(response.data);
                })
                .catch( err => { 
                    if(err.request){ 
                        console.log(err.request) 
                    } 
                    if(err.response){ 
                        console.log(err.response) 
                    }
                });
        };
    }

    function onHandleSort(){
        let FoodItemsNew = FoodItems.slice();

        console.log("Sorting Criteria : " + SortingCriteria);
        console.log("Sorting Order : " + SortingOrder);
        if(SortingCriteria == 0){
            console.log("Before sorting");
            console.log(FoodItemsNew);
            FoodItemsNew.sort((a, b) => {
                return (a.price - b.price) * (SortingOrder ? -1 : +1);
            });
            setFoodItems(FoodItemsNew);
            console.log("After sorting");
            console.log(FoodItemsNew);
        }
        else {
            console.log("Before sorting");
            console.log(FoodItemsNew);

            FoodItemsNew.sort((a, b) => {
                return (a.rating - b.rating) * (SortingOrder ? -1 : 1) ;
            });
            setFoodItems(FoodItemsNew);
            console.log("After sorting");
            console.log(FoodItemsNew);
        }
    }
    return (
        <div >
            <Grid container align={"center"} spacing={1} >       
                <Grid item xs={11}>
                    <TextField id="filled-basic"  variant="filled" fullWidth value={SearchName} onChange={onChangeSearchName}/>
                </Grid>
                <Grid item xs={1} style={{position: 'relative', top: '8px',}}>
                    <Button variant="contained" onClick={onHandleSearch}>SEARCH</Button>
                </Grid>

                <Grid 
                    item xs={2}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <FormControlLabel control={<Checkbox defaultChecked />} label="VEG" />
                    <FormControlLabel control={<Checkbox />} label="NON-VEG" />
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
                <Grid item xs={3}>
                        {ShopList.map((shop, index) => (
                                <FormControlLabel 
                                control={
                                    <Checkbox 
                                        checked={ShopListEnabled[index]}
                                        onChange={() => handleChange(index)}
                                    />} 
                                label={shop.shop} />
                            ))}

                </Grid>

                <Grid item xs={3} >
                    <Typography component="legend">SORTING ORDER</Typography>
                    <Button variant="outlined" onClick={() => setSortingOrder(SortingOrder ? 0 : 1)}>{SortingOrder ? "Descending" : "Ascending"}</Button>
                    <Button variant="outlined" onClick={() => setSortingCriteria(SortingCriteria  ? 0 : 1)}>{SortingCriteria ? "Rating" : "Price"}</Button>
                </Grid>

                <Grid item xs={1}>
                    <Button variant="contained" onClick={onHandleSort}>SORT</Button>
                </Grid>
            </Grid>
                
                {FoodItems.map((food, index) => (
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
                        
                        <Grid item xs={12} sx={miniboxes}>
                            <Button variant="contained" onClick={fixingFavorites(index)}>FAVORITE</Button>
                        </Grid>
                        <Grid item xs={6} sx={miniboxes}>
                            <TextField required id="outlined-required" label="Quantity" value={QuantityList[index]} onChange={(e) => {handleQuantityList(e, index)}} />
                        </Grid>
                        <Grid item xs={6} sx={miniboxes}>
                            <Button variant="contained" onClick={handleBuy(index)}>BUY</Button>
                        </Grid>
                    </Grid>
                ))}
        </div>
    );
};

export default SearchComponent;