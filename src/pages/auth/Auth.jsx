import React from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import logo_black from "../../assets/images/amazone_logo_black.png";

function Auth() {
  return (
    <section className={styles.login}>
      <Link>
        <img src={logo_black} alt="" />
      </Link>
      <div
      className={styles.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <level htmlfor="email">Email</level>
            <input type="email" id="email" />
          </div>
          <div>
            <level htmlfor="password">Password</level>
            <input type="password" id="password" />
          </div>
          <button className={styles.login_signinBtn}>Sign In</button>
        </form>
        <p>
          By signing in you agree  to the AMAZON FAKE CLONE Conditions of use & sale. Please see our Ptivacy Notice, our Cockies Notice and our Interest-Based Ads Notice.
        </p>
        <button className={styles.login_registerBtn}>
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
