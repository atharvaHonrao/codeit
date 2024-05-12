import React from 'react'
import { useAuthValue } from '../utilities/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../utilities/firebase'
import { useNavigate } from 'react-router-dom'


export default function Dashboard() {
  const navigate = useNavigate()

  const logOut = () => {
    signOut(auth).then(() => {
      // console.log("Signed out")
      navigate('/login')
    }).catch((error) => {
      alert("Error signing out")
    });
    // console.log("Signed out")
  }

  const { currentUser } = useAuthValue()
  // console.log(currentUser)
  return (<>
    <div>Dashboard</div>
    <p>{currentUser.email}</p>
    <button onClick={logOut}>Signout</button>
  </>)
}
