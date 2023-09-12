import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from "./updaeduser.module.css"

const Updateduser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password) {
      if (password !== confirm) {
        setModal(true);
        return;
      }
    }
    try {
      const res = fetch(`http://localhost:4000/user/updatedUser/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      setModal2(true);
      setTimeout(() => {
        setModal2(false);
        setUsername('');
        setPassword('');
        setConfirm('');
      }, 3000);
    } catch {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
      {modal && <p>Passwords don't match</p>}
      {modal2 && <p>Updated successfully</p>}
      {error && <p>Error in updating. Try again later.</p>}
      </div>
      <div className={classes.right}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            className={classes.inputField} // Add a class here
            placeholder="Enter new user name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            value={password}
            className={classes.inputField} // Add a class here
            placeholder="Change password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            value={confirm}
            className={classes.inputField} // Add a class here
            placeholder="Confirm password"
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="submit" className={classes.submitButton}>Update</button>
        </form>
      </div>
      
      </div>
  );
};

export default Updateduser;
