import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
export default function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const userName = user?.email?.substr(0, user?.email?.indexOf("@"));
 
  

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div className="header__option" onClick={handleAuthentication}>
            <span className="header__optionLineOne">Hello, {!userName ? "Guest" : userName}</span>
            <span className="header__optionLineTwo">
              {user ? "Sign out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to = {user && "/orders"} >
        <div className="header__option ">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        </Link>

        <div className="header__option ">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__basketCount header__optionLineTwo">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
