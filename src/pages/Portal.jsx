import React, { useEffect, useState } from 'react';
import { db } from '../utilities/firebase';
import { collection, addDoc, onSnapshot, doc, getDocs, query } from "firebase/firestore";

function Portal() {
    const handlePracticeClick = () => {
        // console.log('Practice button clicked');
    };

    const handleCreateGroupClick = () => {
        // console.log('Create Group button clicked');
    };

    const handleJoinGroupClick = () => {
        // console.log('Join Group button clicked');
    };

    const [groupList, setGroupList] = useState([]);


    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });



    useEffect(() => {
        const snap = query(collection(db, "groups"));
        const fetchGroups = onSnapshot(snap, (querySnapshot) => {
            const updatedGroupList = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc.data().name);
                // console.log("Current data: ", doc.data());
                updatedGroupList.push(doc.data().name);
                // console.log(groupList);
            })
            setGroupList(updatedGroupList);
        });
        return fetchGroups
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can handle the form submission here, e.g., sending data to an API or performing other actions.
        // console.log(formData);
        const docRef = await addDoc(collection(db, "groups"), {
            name: formData.name,
            description: formData.description,
        });
        // const docRef2 = await addDoc(collection(db, "groups", docRef.id, "problems"), {
        //     name: "Test Problem",
        //   });
        // console.log("Document written with ID: ", docRef.id);
    };

    return (
        <div>
            <button onClick={handlePracticeClick}>Practice</button>
            <button onClick={handleCreateGroupClick}>Create Group</button>
            <button onClick={handleJoinGroupClick}>Join Group</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {groupList.map((group) => {
                return <div><h1 key={group}>{group}</h1><br /></div>
            })}
        </div>
    );
}

export default Portal;
