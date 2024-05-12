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
import Sidebar from "../components/Sidebar";


export default function MemberPage(props) {
    const navigate = useNavigate();

    const [isGroupVisible, setGroupVisible] = useState(false)
    const handleGroup = () => {
        setGroupVisible(!isGroupVisible)
    };

    const [questions, setQuestions] = useState([])


    const [openStates, setOpenStates] = useState(questions.map(() => false));

    const toggleAccordion = (index) => {
        // Create a copy of the openStates array and toggle the state at the specified index
        const updatedOpenStates = [...openStates];
        updatedOpenStates[index] = !updatedOpenStates[index];
        setOpenStates(updatedOpenStates);
    };
    const [group, setGroup] = useStateWithCallbackLazy({
        name: "",
        description: "",
        problems: [],
        members: [],
        membersName: []
    })

    useEffect(() => {
        // console.log(props.id)

        const fetchGroup = async () => {
            const docRef = doc(db, "groups", props.id);
            const docSnap = await getDoc(docRef);
            // console.log(docSnap.data())
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
                state: { gid: props.id }
            })


    }

    return (<>
        <>
            <Sidebar />
            <div className='maincontainer'>
                <div className="dashheader flex">
                    <h1>{group.name}</h1>
                    {/* <div className="dashheaderright flex">
                        <div className='flex'>
                            <button>Create Group</button>
                        </div>
                    </div> */}
                </div>
                <h2 style={{ padding: '20px' }}>Challange Yourself, Be Stronger</h2>
                <h3 style={{ paddingLeft: '20px' }}>Your Assignments</h3>

                {questions.map((doc, queIndex) => {
                    const isOpen = openStates[queIndex];
                    return <>
                        <div key={queIndex} className={`accordion-wrapper ${isOpen ? 'selected' : ''}`}>
                            <div className={`quetitle flex`} style={{ paddingBlock: '10px' }}>
                                <div>
                                    <div className={`accordion-title ${isOpen ? 'open' : ''}`} onClick={() => toggleAccordion(queIndex)}>{doc.data().name}</div>
                                    <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
                                        <div className="queDisc accordion-content">{doc.data().testDescription}</div>
                                    </div>
                                </div>
                                <button className="ctSelect-btn ctSelect-btn-blue" onClick={() => { handleTestClick(doc.id) }}>
                                    Attempt
                                </button>
                            </div>
                        </div>
                    </>
                })}





            </div>
        </>
    </>
    )
}