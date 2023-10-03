import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


const validatePassword = (password, confirmPassword) => {
  let isValid = true;
  if (password !== "" && confirmPassword !== "") {
    if (password !== confirmPassword) {
      isValid = false;
      console.log("Passwords does not match");
    //   setError("Passwords does not match");
    }
  }
  return isValid;
};

export const register = async (email, password, confirmPassword,e) => {
//   e.preventDefault();
//   setError("");
  if (validatePassword(password, confirmPassword)) {
    // Create a new user with email and password using firebase
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setCurrentUser(res.user);
        console.log(res.user);
        // useNavigate("/editor");
      })
      .catch((err) => console.log(err.message));
  }
//   setEmail("");
//   setPassword("");
//   setConfirmPassword("");
};
