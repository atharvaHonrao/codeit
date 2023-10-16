import React from 'react'
import '../styles/postlogindb.css'
import { useState } from 'react'
import CreateGroup from './CreateGroup'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../utilities/AuthContext'
import { db } from '../utilities/firebase'
import { doc, getDocs, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { collection, query, where } from 'firebase/firestore'
import { useStateWithCallbackLazy } from 'use-state-with-callback'


function PostLoginDashboard() {
  const [isGroupVisible, setGroupVisible] = useState(false)
  const [listOfGroupNames, setListOfGroupNames] = useState([])

  const navigate = useNavigate()
  const { currentUser } = useAuthValue()
  const handleGroup = () => {
    setGroupVisible(!isGroupVisible)
  };

  const [user, setUser] = useStateWithCallbackLazy({
    name: "",
    email: "",
    groupsJoined: [{}],
    groupAdmin: []
  })
  useEffect(() => {
    
    const fetchUser = () => {
      const docRef = doc(db, "users", currentUser.uid);

      return new Promise((resolve, reject) => {

        const docSnap =  getDoc(docRef)
        resolve(docSnap)
      })

       
      
      // console.log(docSnap.data())
      // console.log(listOfGroupNames)
    }
    // debugger
    // console.log(user)

    // console.log(listOfGroupNames)
    fetchUser().then((docSnap) => {
      // debugger
      setUser({
        name: docSnap.data().name,
        email: docSnap.data().email,
        groupsJoined: docSnap.data().groupJoined,
        groupAdmin: docSnap.data().groupAdmin
        // ...docSnap.data()
      }, (user) => {
        console.log("state updated yayyaya")
        console.log(user)
        if(user.name){
        
          let a = Object.values(user.groupsJoined)
          console.log(a)
          setListOfGroupNames(a)
        }
      })

    })
  }, [])


  useEffect(() => {
    // This will show the updated user state in the console
    // console.log(user)
      // console.log("state updated yayyaya")
      // console.log(user)
  }, [user]);

  return (<>
    {isGroupVisible && <CreateGroup boolState={isGroupVisible} changeBoolState={setGroupVisible}

    />}
    <div className='big-container'>

      <br></br>
      <p className='welcome'>Welcome</p>
      <br /><br />
      <div class="groups">
        <div class="column">
          <p className='col-header'>Join a Group</p>
          <input type="text" placeholder="Enter Group Code" className='code-input' />
          <button class="join-button">Join Group</button>
        </div>
        <div class="vertical-line"></div>
        <div class="column">
          <p className='col-header'>Create a group</p>
          <p className='col-text'>Create your own group and invite your others to code!</p>
          <button class="create-button" onClick={handleGroup}>Create Group</button>
        </div>
      </div>

      <br /><br />

      <div className="practice-container">
        <div className="textual">
          <p className='col-header'>Begin your own coding journey on CodeIt today!</p>
          <button className='practice' onClick={() => navigate('/practice')}>Practice</button>
          <button onClick={() => navigate('/group/ucmhzyng', { state: { name: "something maybe" } })}>Open group</button>
        </div>
        {/* <div className="image-part">
          <img src='../images/practice.png' className='motivate' />
        </div> */}
      </div>

      <div className="member">
        <p className="topic">Members</p>
        <div className="table-container">
          <table id='members-table' border={1}>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Group Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listOfGroupNames.map((group) => {
                return <tr key={group}>
                  <td>{group}</td>
                  <td><button className="view-button" onClick={() => navigate(`/group/${group}`, { state: user })}>View</button></td>
                </tr>
              })}



            </tbody>
          </table></div></div>



    </div></>
  )
}

export default PostLoginDashboard


/*
   finalArray = [
    {
      'input': '2 3',
      'output': '5'
    },
    {
      'input': '3 4',
      'output': '7'
    }
   ]

   a = {
    '0 1': '2 3',
    '0 2': '3 4'
   }

*/