import React from "react";
import logo from "../../assets/images/amazon_logo.png";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader"
import styles from "./Header.module.css";

function Header() {
  return (
    <>
    <section>
      <div className={styles.header_container}>
        {/* Logo + Delivery */}
        <div className={styles.logo_container}>
          <a href="#">
            <img src={logo} alt="amazon_logo" />
          </a>

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
            <a href="" className={styles.language}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/archive/a/a4/20151118161037%21Flag_of_the_United_States.svg"
            alt="US Flag"
          />

          <select name="" id="">
            <option value="">EN</option>
          </select>
        </a>
          {/* Account */}
          <a href="">
            <div>
              <p>Sign In</p>
              <span>Accounts & Lists</span>
            </div>
          </a>

          {/* Orders */}
          <a href="">
            <p>Returns</p>
            <span>& Orders</span>
          </a>

          {/* Cart (use href or Link properly) */}
          <a href="" className={styles.cart}>
            <BiCart size={35} />
            <span>0</span>
          </a>
        </div>
      </div>
    </section>
    <LowerHeader/>
    </>
  );
}

export default Header;
