import React, { useState, onChange, useEffect } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/adminLanding.css';
import Navbar from "../components/navbar/navbar";
import { db } from '../utilities/firebase'
import { doc, getDocs, getDoc } from 'firebase/firestore'
import { useStateWithCallbackLazy } from "use-state-with-callback";
import CreateQuestion from "../components/CreateQuestion";
import '../styles/creategroup.css'


export default function AdminLand() {
    const id = useParams()
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
        console.log(id)
        const fetchGroup = async () => {
            const docRef = doc(db, "groups", `${id.id}`);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())
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
                        console.log(member)
                        const docRef = doc(db, "users", member);
                        const docSnap = await getDoc(docRef);
                        console.log(docSnap.data());
                        // debugger
                        names.push(docSnap.data().name);
                    }
                    console.log(names);
                    setGroup({...group2, membersName: names});
        
                }
                
                fetchUsername()
            })
        }
        fetchGroup()

        
    }, [])

    useEffect(() => {
        // This will show the updated user state in the console
        console.log(group);
    }, [group]);

    



    return (<>
                {isGroupVisible && <CreateQuestion boolState={isGroupVisible} changeBoolState={setGroupVisible}/>}
        <div>

            <Navbar />
            <div className="header-container">
                <div className="namedesc">
                    {/* <button onClick={fetchGroup}>ijgrviuewrhgw</button> */}
                    <p className="gname">{group.name}</p>
                    <p className="description">{group.description}</p>
                </div>
                <div className="header-buttons">
                    <button className="action-buttons" onClick={handleGroup}>Add Problem</button>
                    <button className="action-buttons">View Problem</button>
                </div>
            </div>

            <div className="main-container">
                {/* <div className="problem">
                    <p className="topic">Problems</p>
                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Two number sum</h2>
                            <p className='problem-description'>Given An Array Of Integers, Find Two Numbers Such That They Add Up To A Specific Target Number. You May Assume That Each Input Would Have Exactly One Solution And You May Not Use The Same Element Twice In The Result.</p>
                            <p>2E3VWKv7owQXswbSf7wS</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Solve Now!</button>
                        </div>
                    </div>

                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Valid Sudoku</h2>
                            <p className='problem-description'>Determine If A 9x9 Sudoku Board Is Valid. Only The Filled Cells Need To Be Validated According To The Following Rules: Each Row Must Contain The Digits 1-9 Without Repetition. Each Column Must Contain The Digits 1-9 Without Repetition. Each Of The 9 3x3 Sub-Grids Of The Grid Must Contain The Digits 1-9 Without Repetition.</p>
                            <p>375eRchFzcN0ruaf0vzt</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Solve Now!</button>
                        </div>
                    </div>

                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Merge Sorted Lists</h2>
                            <p className='problem-description'>Merge Two Sorted Linked Lists And Return It As A New Sorted List. The New List Should Be Made By Splicing Together The Nodes Of The First Two Lists.</p>
                            <p>3RE84rinlItXAqS0qkqJ</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Solve Now!</button>
                        </div>
                    </div>
                </div> */}

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
                                    console.log(member)
                                    return (
                                     
                                   <tr key={member}>
                                        <td>{member}</td>
                                        <td>hello</td>
                                    </tr>
                                )})
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div></>
    )
}