import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './navbar.module.css'
import {AiOutlineUser, AiOutlineShoppingCart, AiOutlineClose} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const {products} = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mobile, setMobile] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to='/' className={classes.title}>
            foodiee
          </Link>
        </div>
        <div className={classes.center}>
          <ul className={classes.list}>
          <li className={classes.listItem}>
              <a href="/">Home</a>
            </li>
            <li className={classes.listItem}>
              <a href="#contacts">Contacts</a>
            </li>
            <li className={classes.listItem}>
              <a href="#foods">Foods</a>
            </li>
             <li className={classes.listItem}>
              <Link to='/create'>Create</Link>
            </li>
            <li className={classes.listItem}>
              <a href="/updateProfile">update profile </a>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
          <Link to='/cart' className={classes.cartContainer}>
            <AiOutlineShoppingCart className={classes.cartIcon} />
            <div className={classes.cartQuantity}>{products.length}</div>
          </Link>
          <button onClick={handleLogout} className={classes.logout}>Logout</button>
        </div>
      </div>

{
  <div className={classes.mobileNav}>
  
    {
      mobile && 
      <div className={classes.mobile}>
         <AiOutlineClose className={classes.mobileCloseIcon} onClick={() =>setMobile(false)} />
          <div className={classes.left}>
          <Link to='/' className={classes.title}>
            foodiee
          </Link>
        </div>
        <div className={classes.center}>
          <ul className={classes.list}>
                    
            <li className={classes.listItem}>
              <Link to='/create'>Create</Link>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
          <Link to='/cart' className={classes.cartContainer}>
            <AiOutlineShoppingCart className={classes.cartIcon} />
            <div className={classes.cartQuantity}>{products.length}</div>
          </Link>
          <button onClick={handleLogout} className={classes.logout}>Logout</button>
        </div>
      </div>
    }
    { !mobile && <GiHamburgerMenu onClick={()=>setMobile(prev => !prev)} className={classes.burger}/> }
  </div>
}
      </div>
)}
export default Navbar