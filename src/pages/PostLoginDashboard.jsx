import React from 'react'
import '../styles/postlogindb.css'
import { useState } from 'react'
import CreateGroup from '../components/CreateGroup'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../utilities/AuthContext'
import { db } from '../utilities/firebase'
import { doc, getDocs, getDoc, setDoc,updateDoc,arrayUnion } from 'firebase/firestore'
import { useEffect } from 'react'
import { collection, query, where } from 'firebase/firestore'
import { useStateWithCallbackLazy } from 'use-state-with-callback'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function PostLoginDashboard() {
  const [isGroupVisible, setGroupVisible] = useState(false)
  const [listOfGroupNames, setListOfGroupNames] = useState([{}])

  const navigate = useNavigate()
  const { currentUser } = useAuthValue()
  const handleGroup = () => {
    setGroupVisible(!isGroupVisible)
  };

  const [groupCode, setGroupCode] = useState('');

  const [user, setUser] = useStateWithCallbackLazy({
    name: "",
    email: "",
    groupsJoined: [{}],
    groupAdmin: []
  })

  const handleInputChange = (event) => {
    setGroupCode(event.target.value);
  };

  const joinGroup = async() =>{


    console.log(groupCode)
    
    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top"
      }
    });
    // alert('Please enter both test case and expected values.');
    notyf.success('Joined Group Successfully');
    const userRef = doc(db,"users",currentUser.uid)
    const groupRef = doc(db,"groups",groupCode) 

    const groupSnap = await getDoc(groupRef)
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    console.log(groupSnap.data())

    userData.groupJoined[groupCode] =groupSnap.data().name ;

    await setDoc(userRef, userData, { merge: true });
    await updateDoc(groupRef, {
      participantsUid: arrayUnion(currentUser.uid)
    });

    console.log(currentUser.uid)


  }


  useEffect(() => {
    console.log(currentUser.uid)
    const fetchUser = () => {
      const docRef = doc(db, "users", currentUser.uid);

      return new Promise((resolve, reject) => {

        const docSnap =  getDoc(docRef)
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
        if(user2.name){
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
  }, [groupCode])


  // useEffect(() => {
  //   // This will show the updated user state in the console
  //   // console.log(user)
  //     // console.log("state updated yayyaya")
  //     // console.log(user)
  // }, [user]);

  return (<>
    {isGroupVisible && <CreateGroup boolState={isGroupVisible} changeBoolState={setGroupVisible}

    />}
    <div className='big-container'>

      <br></br>
      <p className='welcome'>Welcome</p>
      <br /><br />
      <div className="groups">
        <div className="column">
          <p className='col-header'>Join a Group</p>
          <input type="text" placeholder="Enter Group Code" className='code-input'
          onChange={handleInputChange} />
          <button class="join-button" onClick={joinGroup}>Join Group</button>
        </div>
        <div class="vertical-line"></div>
        <div class="column">
          <p className='col-header'>Create a group</p>
          <p className='col-text'>Create your own group and invite your others to code!</p>
          <button class="create-button" onClick={handleGroup}>Create Group</button>
        </div>
      </div>
      <br /><br />
      <button onClick={() => {
        navigate('/ide', {state:{templates:['help'], input:['help me again'], problemId:[]}})
      }}></button>
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
              {listOfGroupNames.map((group2) => {
                // console.log()
                return <tr>
                  <td>{Object.values(group2)[0]}</td>
                  <td><button className="view-button" 
                  onClick={() => navigate('/group/'+Object.keys(group2)[0], { state: { name: Object.values(group2)[0] } })}
                  // onClick={() => navigate(`/group/${group2}`, { state: user })}
                  
                  >View</button></td>
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