import React from 'react'
import '../styles/creategroup.css'
import { useState, useEffect } from 'react';
import { db } from '../utilities/firebase';
import { collection, addDoc, onSnapshot, doc, getDoc, query, setDoc, updateDoc } from "firebase/firestore";
import { useAuthValue } from '../utilities/AuthContext';  
import { useNavigate } from 'react-router-dom';
import { arrayUnion } from 'firebase/firestore';


function CreateGroup(props) {

  const navigate = useNavigate();
  // Function to generate a random string (as shown in the previous response)
  async function generateRandomString() {
    let isUnique = false;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    // while (!isUnique) {
      let randomString = '';


      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        randomString += alphabet.charAt(randomIndex);
      }

    //   const docRef = doc(db, "groups", randomString);
    //   debugger
    //   getDoc(docRef).then((docSnapshot) => {
    //     if (!docSnapshot.exists) {
    //       isUnique = true; // The code is unique
    //     }
    //   });


    // }

    return randomString;
  }


  const closePop = () => {
    props.changeBoolState(!props.boolState)
  }
  const escapePop = (e) => {
    if (e.key === 'Escape') {
      // Perform an action when the Enter key is pressed
      closePop()
    }
  }

  // const [groupList, setGroupList] = useState([]);


  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });



  // useEffect(() => {
    // const snap = query(collection(db, "groups"));
    // const fetchGroups = onSnapshot(snap, (querySnapshot) => {
    //   const updatedGroupList = [];
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.data().name);
    //     console.log("Current data: ", doc.data());
    //     updatedGroupList.push(doc.data().name);
    //     console.log(groupList);
    //   })
    //   setGroupList(updatedGroupList);
    // });
    // return fetchGroups

  // }, []);

  const {currentUser} = useAuthValue()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle the form submission here, e.g., sending data to an API or performing other actions.
    console.log(formData);
    const uniqueCode = await generateRandomString();
    const docRef = await setDoc(doc(collection(db, "groups"), uniqueCode), {
      name: formData.name,
      description: formData.description,
      adminId: currentUser.uid,
      participantsUid: []
    }).then(() => {
      navigate(`/group/${uniqueCode}`, {state: {groupCode: uniqueCode}})
    });
    const userDocRef = doc(db, "users", currentUser.uid);
    await updateDoc(userDocRef, {
      'groupAdmin': arrayUnion(uniqueCode)
    })
    // const docRef2 = await addDoc(collection(db, "groups", docRef.id, "problems"), {
    //     name: "Test Problem",
    //   });
    // console.log("Document written with ID: ", docRef.id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const containerClass = props.boolState ? 'cgcontainer visible' : 'cgcontainer';
  return (
    <div className={`flex ${containerClass}`} onKeyDown={escapePop}>
      <div className="cgoverlay flex">
        <div className="cgmainbody">
          <button className='cgcancle-btn' onClick={closePop}>X</button>
          <h1 className='cgtitle'>Create Group</h1>
          <h2>Group Name</h2>
          <input placeholder='Enter group name here' onChange={handleChange} type="text"
            id="name"
            name="name" value={formData.name}></input>
          <h2>Group Description</h2>
          <textarea value={formData.description} onChange={handleChange} placeholder='Enter group description here' id='description' name='description' />
          <div className="cgctrl-btns flex">
            <button className="cgsubmit-btn" onClick={handleSubmit}>Create</button>
            <button className="cgcancel-btn" onClick={closePop}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup