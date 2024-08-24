import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedinUser] = useState("");
  const [products, setProducts] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedinUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("Token");
    handleSuccess("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const fetchProduct = async () => {
    try {
      const url = "https://mernback-l2q3.onrender.com/products";
      const headers = {
        headers: { Authorization: localStorage.getItem("Token") },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products &&
          products?.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name}: {item.price}
              </span>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
