import React, { useContext } from "react";
import logo from "../../assets/images/amazon_logo.png";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader"
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../dataProvider/DataProvider";

function Header() {

 const [{basket}, dispatch] = useContext(DataContext)

  return (
    <section className={styles.fixed}>
    <section>
      <div className={styles.header_container}>
        {/* Logo + Delivery */}
        <div className={styles.logo_container}>
          <Link to="/">
            <img src={logo} alt="amazon_logo" />
          </Link>

          <div className={styles.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className={styles.search}>
          <select>
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search product" />
          <BsSearch size={25} />
        </div>

        {/* Right side links */}
        <div className={styles.order_container}>
            <Link to="" className={styles.language}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/archive/a/a4/20151118161037%21Flag_of_the_United_States.svg"
            alt="US Flag"
          />

          <select name="" id="">
            <option value="">EN</option>
          </select>
        </Link>
          {/* Account */}
          <Link to="">
            <div>
              <p>Sign In</p>
              <span>Accounts & Lists</span>
            </div>
          </Link>

          {/* Orders */}
          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={styles.cart}>
            <BiCart size={35} />
            <span>{basket.length}</span>
          </Link>
        </div>
      </div>
    </section>
    <LowerHeader/>
    </section>
  );
}

export default Header;
