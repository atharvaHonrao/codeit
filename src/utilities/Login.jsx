import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from 'react-router-dom'



export const login = (email, password, e) => {
  // e.preventDefault();
  //   setError("");

  signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      setCurrentUser(res.user);

      // console.log(res.user);
    })
    .catch((err) =>  console.log(err.message));

    //   setEmail("");
    //   setPassword("");
    //   setConfirmPassword("");
    };