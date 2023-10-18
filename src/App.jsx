// import './App.css';
// import './components/editor.css';
import GroupPage from './pages/groupPage';
import Editor from './components/editor';
import Navbar from './components/navbar/navbar';
import Signup from './components/signup';
import Login from './components/login';
import Problem from "./components/problem"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Homepage from './components/homepage';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthProvider } from './utilities/AuthContext';
import {useEffect} from 'react'
import {auth} from './utilities/firebase.js'
import {onAuthStateChanged} from 'firebase/auth'
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import SelectProblem from './components/SelectProblem';
import Portal from './pages/Portal';
import PostLoginDashboard from './pages/PostLoginDashboard';
import UserGroupLanding from './pages/UserGroupLanding';
import MemberPage from './pages/MemberPage';
import RoleCheck from './components/RoleCheck';
import CheckUser from './components/CheckUser';
import TestForm from './pages/createTest';
import TestPage  from './pages/TestPage';


// Initialize Firebase


// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   // Create a function to sign up a new user

//   const signUp = (email, password) => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed up 
//         setCurrentUser(userCredential.user);
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//       });
//   }

//   const signIn = async (email, password) => {
//     signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     setCurrentUser(userCredential.user);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
//   };

//   // Create a function to sign out the current user
//   const signOut = async () => {
//     signOut(auth).then(() => {
//       console.log("Signed out")
//     }).catch((error) => {
//       // An error happened.
//     });
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, signUp, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const authContext = useContext(AuthContext);
//   const navigate = useNavigate();
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     await authContext.signUp(email, password);
//     navigate("/editor")
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//       />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// const PrivateRoute = ({ children }) => {
//   const currentUser = React.useContext(AuthContext).currentUser;

//   if (!currentUser) {
//     return <h1>You must be logged in to access this page.</h1>;
//   }

//   return children;
// };

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const authContext = useContext(AuthContext);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     await authContext.signIn(email, password);
//     navigate("/editor")
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//       />
//       <button type="submit">Sign In</button>
//     </form>
//   );
// };

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])
  // const navigate = useNavigate();
  return (
    <div className="App">
      <AuthProvider value={{currentUser}}>
        <Router>
          <Routes>
            <Route exact path="/signup" element={<Signup />}>
            </Route>
            <Route exact path="/" element={<LandingPage />}>
            </Route>
            <Route exact path="/login" element={<Login />}>
            </Route>
            <Route exact path="/portal" element={<Portal />}>
            </Route>
            <Route exact path="/dashboard" element={
              currentUser != null ? <PostLoginDashboard/> : <Login/>
            }>
            </Route>
            <Route path="/editor/:id" element={<Editor/>}/>
            <Route path="/group/:id" element={<RoleCheck user={currentUser}/>}/>
            <Route path="/user" element={<UserGroupLanding/>}/>
            <Route path="/practice" element={<SelectProblem/>}/>
            {/* <Route path="/member/:id" element={<MemberPage/>}/> */}
            <Route path="/profile" element={<CheckUser/>}/>
            <Route path="/test" element={<TestForm/>}/>
            <Route path="/test/:id" element={<TestPage/>}/>

            {/* <Route exact path="/signin" element={<SignIn />}> */}
            {/* </Route> */}
            {/* <Route path="/editor" element={//() => {
              // const currentUser = React.useContext(AuthContext).currentUser;

              // if (!currentUser) {
              //   <h1>You must be logged in to access this page.</h1>;
              // }
              (currentUser != "") ? <>
              <Navbar/>
              <Problem/>
              <Editor/></> : <h1>You must be logged in to access this page.</h1>
            }>
            </Route> */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
