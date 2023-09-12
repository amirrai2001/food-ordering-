import React, { useState } from 'react';
import classes from './newsletter.module.css';
import { AiOutlineSend } from 'react-icons/ai';
import newsletterIllustration from '../../assets/get-newsletter-updates.svg';

const Newsletter = () => {
  const [news, setNews] = useState('');

  const handleSubmit = () => {
    if (!isValidEmail(news)) {
      alert('Please enter a valid email');
      return;
    }
    alert('Thank you for subscribing to our newsletter');
    setNews('');
  };

  const handleInputChange = (event) => {
    setNews(event.target.value);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <section id='contacts' className={classes.container}>
      <div className={classes.wrapper}>
        <h4 className={classes.subtitle}>Get our latest offers</h4>
        <h2 className={classes.title}>Newsletter</h2>
        <div className={classes.inputContainer}>
          <input
            type="text"
            placeholder='Enter email...'
            value={news}
            onChange={handleInputChange}
          />
          <AiOutlineSend className={classes.sendIcon} onClick={handleSubmit} />
        </div>
        <img src={newsletterIllustration} className={classes.illustration} alt=""/>
      </div>
    </section>
  );
}

export default Newsletter;
