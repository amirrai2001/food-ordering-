import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Token = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const token = location.pathname.split("/")[2]
           const res = fetch(`http://localhost:4000/auth/token/${token}`,{
           method:"post"})
           if (token) {
            fetch(`http://localhost:4000/auth/token/${token}`, {
              method: "POST",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data)
                if (data) {
                    dispatch(login(data));
                navigate("/")
                }
              })
              .catch((error) => console.log('Error:', error));
          } else {
            console.log('Token not found in URL');
          } },[]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Token;
