
import { useState, useEffect } from 'react';
import axios from 'axios';

const VendorStatistics = (props) => {
    const [OrdersList, setOrdersList] = useState([]);
    const [FoodList, setFoodList] = useState([]);

    const [OrderPlaced, setOrderPlaced] = useState(0);
    const [OrdersCompleted, setOrdersCompleted] = useState(0);
    const [OrderPending, setOrderPending] = useState(0);

    var mapSort1 = new Map();

    useEffect(() => {
        let foodList = [];
        let foodGot = false
        axios
        .get("http://localhost:4000/food/")
        .then((response) => {
            foodList = response.data.slice();
            foodGot = true;
        });

        axios 
        .get("http://localhost:4000/order/")
        .then((response) => {
            // console.log("Response is : ");
            // console.log(response.data);
            
            let orders = response.data.slice();
            

            while(!foodGot)
                console.log("waiting...");

            orders.map((order, index) => {
                const found = foodList.find((item) => item._id == order.foodId);
                
                orders[index].foodId = found;
            })

            let newOrders = [];
            
            orders.map((order) => {
                if(order.foodId.shop == props.loggedInUser.shop)
                    newOrders.push(order);
            })

            orders = newOrders.slice();
            newOrders = [];
            
            setOrdersList(orders);

            let completedCount = 0;
            let placedCount = 0;
            let pendingCount = 0;

            orders.map((order) => {
                if(order.status == "COMPLETED")
                    completedCount++;
                else if(order.status == "PLACED")
                    placedCount++;
                else if(order.status != "REJECTED")
                    pendingCount++;
            });

            setOrderPlaced(placedCount);
            setOrdersCompleted(completedCount);
            setOrderPending(pendingCount);

            let mymap = new Map();
            
            orders.map((order) => {
                if(mymap.has(order.foodId.name))
                mymap.set(order.foodId.name, mymap.get(order.foodId.name) + 1);
                else
                mymap.set(order.foodId.name, 1);
            });

            mapSort1 = new Map([...mymap.entries()].sort((a, b) => b[1] - a[1]));
            console.log("sorted map is ");
            console.log(mapSort1);

            let newArray = [];
            
            mapSort1.forEach((val, key) => {
                //FoodItemMap.push({name : key, count : val});
                newArray.push(key);
            })

            setFoodList(newArray);

            console.log(FoodList);
        });
    }, []);

    return (
        <div>
            <h1>Vendor Statistics</h1>

            <h2> Top 5 Food Items Sold</h2>

            <div className="row">
                {FoodList.map((item, index) => (
                        (index < 5) ? <h3>{ (index+1) + " . " + item}</h3> : null   
                ))}
            </div>

            <h2> Order Statistics</h2>
            <h3>Orders Placed : {OrderPlaced}</h3>
            <h3>Orders Completed : {OrdersCompleted}</h3>
            <h3>Orders Pending : {OrderPending}</h3>
        </div>
    )
}

export default VendorStatistics;
