import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import CreateGroup from '../components/CreateGroup'
import '../styles/userdashboard.css'
import grpimg from '../assets/group2.jpg'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../utilities/AuthContext'
import { db } from '../utilities/firebase'
import { doc, getDocs, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useEffect } from 'react'
import { collection, query, where } from 'firebase/firestore'
import { useStateWithCallbackLazy } from 'use-state-with-callback'

function UserDashboard() {
  // const [isGroupVisible, setGroupVisible] = useState(false)
  const [isGroupVisible, setGroupVisible] = useState(false)
  const [listOfGroupNames, setListOfGroupNames] = useState([{}])

  const navigate = useNavigate()
  const { currentUser } = useAuthValue()
  // const handleGroup = () => {
  //   setGroupVisible(!isGroupVisible)
  // };

  // const [groupCode, setGroupCode] = useState('');

  const [user, setUser] = useStateWithCallbackLazy({
    name: "",
    email: "",
    groupsJoined: [{}],
    groupAdmin: []
  })

  // const handleInputChange = (event) => {
  //   setGroupCode(event.target.value);
  // };

  const joinGroup = async () => {


    console.log(groupCode)

    const userRef = doc(db, "users", currentUser.uid)
    const groupRef = doc(db, "groups", groupCode)

    const groupSnap = await getDoc(groupRef)
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    console.log(groupSnap.data())

    userData.groupJoined[groupCode] = groupSnap.data().name;

    await setDoc(userRef, userData, { merge: true });
    await updateDoc(groupRef, {
      participantsUid: arrayUnion(currentUser.uid)
    });

    console.log(currentUser.uid)

  }


  useEffect(() => {
    console.log(currentUser)
    const fetchUser = () => {
      const docRef = doc(db, "users", currentUser.uid);

      return new Promise((resolve, reject) => {

        const docSnap = getDoc(docRef)
        console.log(docSnap)
        resolve(docSnap)
      })
    }
    fetchUser().then((docSnap) => {
      // debugger
      setUser({
        name: docSnap.data().name,
        email: docSnap.data().email,
        groupsJoined: docSnap.data().groupJoined,
        groupAdmin: docSnap.data().groupAdmin
        // ...docSnap.data()
      }, (user2) => {
        // console.log("state updated yayyaya")
        console.log(user2)
        if (user2.name) {
          // const arrayOfList = Object.entries(user2.groupsJoined);
          // object to array of objects
          const arrayOfObjects = Object.keys(user2.groupsJoined).map(key => ({
            [key]: user2.groupsJoined[key]
          }));
          // console.log(arrayOfObjects)
          setListOfGroupNames(arrayOfObjects)
        }
      })
    })
  }, [])


  // const [listOfGroupNames, setListOfGroupNames] = useState([
  //   { name: 'ADSA', desc: "A Group to excels ADSA subject" },
  //   { name: 'ADSA', desc: "A Group for excels ADSA subject" },
  //   { name: 'ADSA', desc: "A Group for excels ADSA subject" },
  //   { name: 'ADSA', desc: "A Group for excels ADSA subject" },
  //   { name: 'ADSA', desc: "A Group for excels ADSA subject" },
  //   { name: 'ADSA', desc: "A Group for excels ADSA subject" },
  //   { name: 'ADSA', desc: "A Group for excels ADSA subject" }])
  const [groupCode, setGroupCode] = useState('');

  // const [user, setUser] = useStateWithCallbackLazy({
  //   name: "",
  //   email: "",
  //   groupsJoined: [{}],
  //   groupAdmin: []
  // })

  const handleInputChange = (event) => {
    setGroupCode(event.target.value);
  };

  const handleGroup = () => {
    setGroupVisible(!isGroupVisible)
  };

  return (
    <>
      <Sidebar />
      {isGroupVisible && <CreateGroup boolState={isGroupVisible} changeBoolState={setGroupVisible} />}
      <div className='maincontainer' style={{'padding': '20px'}}>
        <div className="dashheader flex">
          <h1>Namaste {user.name}</h1>
          <div className="dashheaderright flex">
            <div className='flex'>
              <button onClick={handleGroup}>Create Group</button>
            </div>
            <div className='flex'>
              <p>Join Group</p>
              <input placeholder='Enter code here'></input>
            </div>
          </div>
        </div>
        <h2 style={{'padding': '20px'}}>Your Groups. Compete Learn and Grow together!</h2>
        <div className="feature-cards flex">
          {listOfGroupNames.map((group2) => {
            // console.log()
            return (
              <div className="cardbody flex" onClick={() => navigate('/group/' + Object.keys(group2)[0], { state: { name: Object.values(group2)[0] } })}>
                <img src={grpimg} alt="" />
                <h2>{Object.values(group2)[0]}</h2>
                <p></p>
              </div>
              // {listOfGroupNames.map((group2) => {
              //   // console.log()
              //   return <tr>
              //     <td>{Object.values(group2)[0]}</td>
              //     <td><button className="view-button" 
              //     onClick={() => navigate('/group/'+Object.keys(group2)[0], { state: { name: Object.values(group2)[0] } })}
              //     // onClick={() => navigate(`/group/${group2}`, { state: user })}

              //     >View</button></td>
              //   </tr>
              // })}
            )
          })}
        </div>
      </div>
    </>
  )
}

export default UserDashboard