import React, { useState, onChange, useEffect } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/adminLanding.css';
import Navbar from "../components/navbar/navbar";
import { db } from '../utilities/firebase'
import { doc, getDocs, getDoc } from 'firebase/firestore'
import { useStateWithCallbackLazy } from "use-state-with-callback";
import CreateQuestion from "../components/CreateQuestion";
import '../styles/creategroup.css'
import ProblemInSelection from "../components/ProblemInSelection";
import { collection, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import '../styles/creategroup.css'


export default function MemberPage(props) {
    const navigate = useNavigate();

    const [isGroupVisible, setGroupVisible] = useState(false)
    const handleGroup = () => {
        setGroupVisible(!isGroupVisible)
    };
    const [group, setGroup] = useStateWithCallbackLazy({
        name: "",
        description: "",
        problems: [],
        members: [],
        membersName: []
    })
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        console.log(props.id)
        
        const fetchGroup = async () => {
            const docRef = doc(db, "groups", props.id);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())
            setGroup({
                name: docSnap.data().name,
                description: docSnap.data().description,
                members: docSnap.data().participantsUid,
                membersName: []
            })
        }

        fetchGroup()

        const fetchQuestions = async () => {

            const querySnapshot = await getDocs(collection(db, "groups", props.id, "test"));
            const docs = querySnapshot.docs.map(doc => doc)
            setQuestions(docs)

        }
        fetchQuestions()
    }, [])

    const handleTestClick = (id) => {
        navigate(`/test/${id}`,
            {
                state: { gid: props.id}
            })


    }

    return (<>
        {isGroupVisible && <CreateQuestion boolState={isGroupVisible} changeBoolState={setGroupVisible} />}
        <div>
            <Navbar />
            <div className="header-container">
                <div className="namedesc">
                    {/* <button onClick={fetchGroup}>ijgrviuewrhgw</button> */}
                    {/* <p className="gname">{group.name}</p> */}
                    {/* <p className="description">{group.description}</p> */}
                </div>
                <div className="header-buttons">
                    {/* <button className="action-buttons" onClick={handleGroup}>Add Problem</button>
                    <button className="action-buttons">View Problem</button> */}
                </div>
            </div>

            <div className="main-container">
                <div className="member">
                    <p className="topic">Solve Problems</p>
                    <div className="table-container">
                        {questions.map((doc) => {
                            return <>

                                <div>
                                    <div>
                                        <h2>{doc.data().name}</h2>
                                    </div>
                                    <div>
                                        {doc.data().testDescription}
                                    </div>
                                    <button onClick={() => { handleTestClick(doc.id) }} className="ctsubmit-btn">Give Test</button>
                                </div>
                            </>
                        })}
                    </div>
                </div>
            </div>
        </div></>
    )
}