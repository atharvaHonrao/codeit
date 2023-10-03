import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {redirect} from 'react-router-dom'



export const login = (email, password, e) => {
      // e.preventDefault();
    //   setError("");
        debugger
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            setCurrentUser(res.user);
            debugger
            console.log(res.user);
            redirect('/editor')
          })
          .catch((err) => console.log(err.message));
      
    //   setEmail("");
    //   setPassword("");
    //   setConfirmPassword("");
    };