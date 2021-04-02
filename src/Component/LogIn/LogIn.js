import React, { useContext, useState } from "react";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGoogle } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.Config";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const LogIn = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);
  const[authError, setAuthError] = useState('')

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  //google provider
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handelGoogleSingIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const userDetails = result.user 
     
        setLogedInUser(userDetails)
        history.replace(from);
      })
      .catch((error) => {
        console.log(error)
        const errorMassege = error.message;
        console.log(errorMassege);
        setAuthError(errorMassege)
        console.log(logedInUser);
      });
  };  
 

  return (
    <section className="container LogIn-Section">
      <div className="row  mt-5 text-left justify-content-center">
        <div className="col-md-6">
          <button className="login-button mt-5 py-2 w-100 text-left"
            onClick={handelGoogleSingIn}>
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />Continue With Google</button>
            {setAuthError.errorMassege && <p className="text-danger">{logedInUser.errorMassege}</p>}
        </div>
      </div>
    </section>
  );
};

export default LogIn;
