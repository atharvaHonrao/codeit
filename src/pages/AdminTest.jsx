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
import '../styles/adminLanding.css';
import Sidebar from "../components/Sidebar";
import "../styles/creategroup.css";

export const AdminTest = () => {
    let navigate = useNavigate()
    const Location = useLocation()
    const [group, setGroup] = useStateWithCallbackLazy({
        name: "",
        description: "",
        problems: [],
        // members: [],
        // membersName: []
    })
    const [test,setTest] = useState([])

    const [openStates, setOpenStates] = useState(test.map(() => false));

    const toggleAccordion = (index) => {
        // Create a copy of the openStates array and toggle the state at the specified index
        const updatedOpenStates = [...openStates];
        updatedOpenStates[index] = !updatedOpenStates[index];
        setOpenStates(updatedOpenStates);
    };


    useEffect(() => {
        console.log(Location.state.gid)
        
        const fetchGroup = async () => {
            const docRef = doc(db, "groups", Location.state.gid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())
            setGroup({
                name: docSnap.data().name,
                description: docSnap.data().description,
            })
        }

        fetchGroup()

        const fetchQuestions = async () => {

            const querySnapshot = await getDocs(collection(db, "groups", Location.state.gid, "test"));
            const docs = querySnapshot.docs.map(doc => doc)
            setTest(docs)
            console.log(docs)
        }
        fetchQuestions()
    }, [])

    const finalSubmit = (id,name,description) =>{
        navigate(`/submissions/${id}`,{state:{gid:Location.state.gid}})
    }


//   const { id } = useParams()
  return (
    <div>
            
            <Sidebar/>
            <div className="maincontainer">
                <div className="problem">
                    <p className="topic">Submissions</p>

                    {test.map((doc, queIndex)=>{

const isOpen = openStates[queIndex];
return <>
    <div key={queIndex} className={`accordion-wrapper ${isOpen ? 'selected' : ''}`}>
        <div className={`quetitle flex`} style={{ paddingBlock: '10px'}}>
            <div>
                <div className={`accordion-title ${isOpen ? 'open' : ''}`} onClick={() => toggleAccordion(queIndex)}>{doc.data().name}</div>
                <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
                    <div className="queDisc accordion-content">{doc.data().testDescription}</div>
                </div>
            </div>
            <button className="ctSelect-btn ctSelect-btn-blue" onClick={e=>{finalSubmit(doc.id,doc.data().name,doc.data().testDescription)}}>View</button>
                
        </div>
    </div>
</>

                    //     return <div className='flex problemrow1'>
                    //     <div className='problem-left'>
                    //         <h2>{doc.data().name}</h2>
                    //         <p className='problem-description'>{doc.data().testDescription}</p>
                    //         {/* <p>Test id={doc.id}</p> */}
                    //     </div>
                    //     <div className='problem-right flex'>
                    //         <button className="submit" onClick={e=>{finalSubmit(doc.id,doc.data().name,doc.data().testDescription)}}>View Submissions</button>
                    //     </div>
                    // </div>

                    })}
                    

                    {/* <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Test 2</h2>
                            <p className='problem-description'>Generic test description</p>
                            <p>2E3VWKv7owQXswbSf7wS</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Start Test</button>
                        </div>
                    </div>

                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Test 3</h2>
                            <p className='problem-description'>Generic test description</p>
                            <p>2E3VWKv7owQXswbSf7wS</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Start Test</button>
                        </div>
                    </div> */}
                </div> 
            </div>
        </div>
  )
}
