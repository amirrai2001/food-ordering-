import React from "react"
import classes from "./footer.module.css"
import { AiFillInstagram, AiFillFacebook, AiFillTwitterCircle } from "react-icons/ai"

const Footer = () => {
  return (
    <section id="faq" className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2 className={classes.title}>Working days</h2>
          <ul className={classes.list}>
            <li>Monday - Friday</li>
            <li className={classes.workingTime}>08:00 - 22:00</li>
            <li>Saturday</li>
            <li className={classes.workingTime}>08:00 - 20:00</li>
          </ul>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Newsletter</h2>
          <ul className={classes.list}>
            <li>Subscribe to our newsletter</li>
            <li>Receive the latest meals</li>
            <li>Get the menu with promos</li>
            <li>Everything weekly!</li>
          </ul>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Social Media</h2>
          <ul className={classes.iconList}>
            <li> <a href="https://www.instagram.com/"><AiFillInstagram /></a></li>
            <li> <a href="https://facebook.com"> <AiFillFacebook /></a></li>
            <li> <a href="https://twitter.com"> <AiFillTwitterCircle /> </a> </li>
          </ul>
        </div>
      </div>
        <div className={classes.attribution}>
        <h3> "createor: amir rai" </h3>
       
       </div>
    </section>
  )
}

export default Footer