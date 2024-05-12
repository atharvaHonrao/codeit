import React, { useState, onChange, useEffect } from "react";
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import '../styles/adminLanding.css';
import Navbar from "../components/navbar/navbar";
import { db } from '../utilities/firebase'
import { doc, getDocs, getDoc } from 'firebase/firestore'
import { useStateWithCallbackLazy } from "use-state-with-callback";
import CreateQuestion from "../components/CreateQuestion";
import '../styles/creategroup.css';
import CreateTest from "../components/CreateTest";
import { useNavigate } from 'react-router-dom';


export default function AdminLand() {
    const id = useParams()
    const navigate = useNavigate();

    const [isGroupVisible, setGroupVisible] = useState(false)
    const handleGroup = () => {
        setGroupVisible(!isGroupVisible)
    };
    // const [, forceRender] = useState(undefined);
    const [group, setGroup] = useStateWithCallbackLazy({
        name: "",
        description: "",
        problems: [],
        members: [],
        membersName: []
    })

    useEffect(() => {
        // console.log(id)
        const fetchGroup = async () => {
            const docRef = doc(db, "groups", `${id.id}`);
            const docSnap = await getDoc(docRef);
            // console.log(docSnap.data())
            setGroup({
                name: docSnap.data().name,
                description: docSnap.data().description,
                members: docSnap.data().participantsUid,
                membersName: []
                // problems: docSnap.data().problems,
                // members: docSnap.data().members
            }, (group2) => {
                const fetchUsername = async () => {
                    const names = [];
                    for (const member of group2.members) {
                        // console.log(member)
                        const docRef = doc(db, "users", member);
                        const docSnap = await getDoc(docRef);
                        // console.log(docSnap.data());
                        // debugger
                        names.push(docSnap.data().name);
                    }
                    // console.log(names);
                    setGroup({ ...group2, membersName: names });
                }
                fetchUsername()
            })
        }
        fetchGroup()
    }, [])
    const showTest = () => {
        navigate('/adminTest', { state: { gid: id.id } })
    }


    useEffect(() => {
        // This will show the updated user state in the console
        // console.log(group);
    }, [group]);

    return (<>
        {isGroupVisible ? <CreateTest boolState={isGroupVisible} changeBoolState={setGroupVisible} id={id.id} /> :
            <div>
                <Navbar />
                <div className="header-container">
                    <div className="namedesc">
                        {/* <button onClick={fetchGroup}>ijgrviuewrhgw</button> */}
                        {/* <p className="gname">{group.name}</p> */}
                        {/* <p className="description">{group.description}</p> */}
                    </div>
                    <div className="header-buttons">
                        <button className="action-buttons" onClick={handleGroup}>Add Tests</button>
                        <button className="action-buttons" onClick={showTest}>View Test</button>
                    </div>
                </div>

                <div className="main-container">
                    <div className="member">
                        <p className="topic">Members</p>
                        <div className="table-container">
                            <table id='members-table' border={1}>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Problems Submitted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        group.membersName.map((member) => {
                                            // console.log(member)
                                            return (

                                                <tr key={member}>
                                                    <td>{member}</td>
                                                    <td>hello</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}</>
    )
}