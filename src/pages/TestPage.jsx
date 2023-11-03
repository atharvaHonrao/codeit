import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { doc, getDocs, getDoc, collection } from 'firebase/firestore'
import { db } from '../utilities/firebase'
import { useStateWithCallbackLazy } from "use-state-with-callback";
import ProblemInSelection from '../components/ProblemInSelection';
import Sidebar from '../components/Sidebar';
import '../styles/creategroup.css'
import { useNavigate } from 'react-router-dom';

function TestPage() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [questions, setQuestions] = useState([])
    const Location = useLocation()
    const [test, setTest] = useStateWithCallbackLazy({
        name: "",
        testDescription: "",
    })

    const [openStates, setOpenStates] = useState(questions.map(() => false));

    const toggleAccordion = (index) => {
        // Create a copy of the openStates array and toggle the state at the specified index
        const updatedOpenStates = [...openStates];
        updatedOpenStates[index] = !updatedOpenStates[index];
        setOpenStates(updatedOpenStates);
    };


    useEffect(() => {
        const fetchTest = async () => {
            const docRef = doc(db, "groups", Location.state.gid, "test", id);
            const docSnap = await getDoc(docRef);

            console.log(docSnap.data())
            setTest({
                name: docSnap.data().name,
                testDescription: docSnap.data().testDescription,
            })
        }
        fetchTest()

        const fetchQuestions = async () => {
            const querySnapshot = await getDocs(collection(db, "groups", Location.state.gid, "test", id, "problems"));

console.log("jwsvwbnwrb")
            // console.log(questionSnap)
            const docs = querySnapshot.docs.map(doc => doc)
            setQuestions(docs)
        }

        fetchQuestions()

    }, [])
    console.log(id)
    return (
        <>
            {/* <h1>TestPage {id}</h1> */}
            <Sidebar/>
            <div className='maincontainer'>
                <div className="dashheader flex">
                    <h1>{test.name}</h1>
                </div>
                <div>
                    <h2 style={{ padding: '20px'}}>{test.testDescription}</h2>
                </div>
                <div className="table-container">
                    {questions.map((doc, queIndex) => {
                        // console.log(doc.id)
                        // return <ProblemInSelection id={doc.id} classname='problemrow' title={doc.data().name} difficulty='easy' description={doc.data().description} testcases={doc.data().testcases} testId={id}/>

                        const isOpen = openStates[queIndex];
                        return <>
                            <div key={queIndex} className={`accordion-wrapper ${isOpen ? 'selected' : ''}`}>
                                <div className={`quetitle flex`} style={{ paddingBlock: '10px' }}>
                                    <div>
                                        <div className={`accordion-title ${isOpen ? 'open' : ''}`} onClick={() => toggleAccordion(queIndex)}>{doc.data().name}</div>
                                        <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
                                            <div className="queDisc accordion-content">{doc.data().description}</div>
                                        </div>
                                    </div>
                                    <button className="ctSelect-btn ctSelect-btn-blue" onClick={() => {
                                        navigate(`/editor/${id}`,
                                            {
                                                state: { title: doc.data().name, description: doc.data().description, testcases: doc.data().testcases, testId: id }
                                            }
                                        );
                                    }}>
                                        Solve Now!
                                    </button>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            </div>
        </>
    )
}

export default TestPage