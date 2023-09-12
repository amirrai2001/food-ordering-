import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from "./show.module.css"
import { Link } from 'react-router-dom';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { addProduct } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux';


const Show = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product/showall");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const addToCart = () => {
    dispatch(addProduct({...data }))
  }

  return (
 <div className={classes.container}>
  <h1 className={classes.head}>   Menu  </h1>
  <div className={classes.wrapper}>
       {data.map(item => (
         <Link to={`/food/${item._id}`} >
        <div key={item._id} className={classes.main}>
        <img src={`http://localhost:4000/images/${item.img}`} className={classes.imgContainer} alt={item.title} />
        {console.log(item.title)}
       
     <div className={classes.right}> 
            <h2 className={classes.title}>{item.title}</h2>
          <p className={classes.price}> ${item.price}</p>
          <p>Review: <span>{item.review}⭐</span> </p>
          <p className={classes.foodDetails}>describtion: {item.desc}</p>
          <button onClick={addToCart} className={classes.addToCart}>Add To Cart <AiOutlineShoppingCart /></button>
          
        </div> 
        
        <div>
         </div>  
         </div> </Link>
      ))}</div>
    </div>

  );
};

export default Show;
