import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import {GrLogout} from "react-icons/gr";
import {FaRegUser , FaOpencart} from "react-icons/fa";
import './NavbarStyle.css'


export default function Navbar() {

  const navigate = useNavigate()
  function logOut(){
    localStorage.removeItem("jwt")
    localStorage.removeItem("userName")
    navigate("/")
  }
  const userName = localStorage.getItem('userName');


  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }

  
  
  return (
    <div>
      <nav>
        <div className="logoCont">
          <Link to="/">
            <span></span>
            <img className="logo" src="/images/salogo.png" alt="Logo" />
          </Link>
        </div>
        <div>
          <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
            <li><Link className="active" to="/">Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to="/allproducts">Shop</Link></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
            <li><Link to="/buyonline">Buy Online</Link></li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <div>
        <span style={{width: '40px'}}><Link to="/user"><FaRegUser/></Link></span>
          <h3 style={{fontSize: "1.2rem", marginRight: "10px",marginTop: "4px", textShadow: "1px 1px gray", cursor: "pointer" }}>{userName}</h3>
            <Link onClick={logOut}><GrLogout/></Link>
        </div>
        <div className="cartIcon"><Link to="/cart"><FaOpencart/></Link></div>
      </nav>
    </div>
  );
}