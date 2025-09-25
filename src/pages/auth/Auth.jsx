import React, { useState, useContext } from "react";
import styles from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo_black from "../../assets/images/amazone_logo_black.png";
import { auth } from "../../utility/firebase";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import {ClipLoader} from "react-spinners"
import {DataContext} from "../../components/dataProvider/DataProvider"
import { Type } from "../../utility/action.type";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({signIn:false, signUp:false});

const [{user}, dispatch] = useContext(DataContext)
const navigate = useNavigate()
const navStateData = useLocation()
console.log(navStateData)

console.log(user)
  const authHandler = async (e) => {
    e.preventDefault();

   if (e.target.name === "signin") {
      setLoading({...loading, signIn:true})
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user
          })
          setLoading({...loading, signIn: false})
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          setLoading({...loading, signIn: false})
          setError(err.message);
        });
    } else if (e.target.name === "signup") {
      setLoading({...loading, signUp:true})
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
           dispatch({
             type: Type.SET_USER,
             user: userInfo.user,
           });
           setLoading({...loading, signUp:false})
           navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({...loading, signUp:false})
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
        {
          navStateData?.state?.msg && (
            <small style={{padding: "5px", textAlign: "center", color: "red", fontWeight: "bold"}}>
              {navStateData?.state?.msg}
            </small>
          )
        }
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
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

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
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ color: "red", paddingTop: "10px" }}> {error} </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
