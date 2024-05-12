import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


const validatePassword = (password, confirmPassword) => {
  let isValid = true;
  if (password !== "" && confirmPassword !== "") {
    if (password !== confirmPassword) {
      isValid = false;
      // console.log("Passwords does not match");
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
      .then(async (res) => {
        setCurrentUser(res.user);
        const docRef = await addDoc(collection(db, "users"), {
          name: res.user.displayName,
          email: res.user.email,
          tier: "free",
          uid: res.user.uid,
        });
        // console.log("Document written with ID: ", docRef.id);
        // console.log(res.user);
        alert("User Created Successfully. Please Login to continue")
        useNavigate("/login");
      })
      .catch((err) => console.log(err.message));
  }
//   setEmail("");
//   setPassword("");
//   setConfirmPassword("");
};
