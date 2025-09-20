import React, { useState, useContext } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import logo_black from "../../assets/images/amazone_logo_black.png";
import { auth } from "../../utility/firebase";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import {DataContext} from "../../components/dataProvider/DataProvider"
import { Type } from "../../utility/action.type";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const [{user}, dispatch] = useContext(DataContext)

console.log(user)
  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === "signin") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user
          })
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    } else if (e.target.name === "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
           dispatch({
             type: Type.SET_USER,
             user: userInfo.user,
           });
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    }
  };

  return (
    <section className={styles.login}>
      <Link to="/">
        <img src={logo_black} alt="Amazon Logo" />
      </Link>

      <div className={styles.login_container}>
        <h1>Sign In</h1>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={styles.login_signinBtn}
          >
            Sign In
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          By signing in you agree to the AMAZON FAKE CLONE Conditions of use &
          sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          type="button"
          onClick={authHandler}
          name="signup"
          className={styles.login_registerBtn}
        >
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
