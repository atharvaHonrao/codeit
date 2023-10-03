import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar';
import ProblemInSelection from '../components/ProblemInSelection';
import '../styles/selectProblem.css'
import { useAuthValue } from '../utilities/AuthContext';
import { db } from '../utilities/firebase'
import { collection, getDocs } from "firebase/firestore";



const SelectProblem = () =>  {

    const [questions, setQuestions] = useState([])
    useEffect(() => {
    const fetchQuestions = async () => {
        const querySnapshot = await getDocs(collection(db, "problems"));
        console.log(querySnapshot) //
        // debugger
        const docs = querySnapshot.docs.map(doc => doc)
        setQuestions(docs)
    }
    fetchQuestions()
    }, [])

    return (
        <>
            <Navbar />
            <div className="searchbar">
                <input placeholder='Search for any problem here' />
            </div>
            <div className='problemrow-container'>
                {/* <ProblemInSelection classname='problemrow' title='Stack in c' difficulty='easy' description='Implement stack with using pointers and arrays' />
                <ProblemInSelection classname='problemrow' title='Stack in c' difficulty='easy' description='Implement stack with using pointers and arrays' />
                <ProblemInSelection classname='problemrow' title='Stack in c' difficulty='easy' description='Implement stack with using pointers and arrays' />
                <ProblemInSelection classname='problemrow' title='Stack in c' difficulty='easy' description='Implement stack with using pointers and arrays' /> */}

                {questions.map((doc) => {
                    console.log(doc.id)
                                  return  <ProblemInSelection id={doc.id} classname='problemrow' title={doc.data().title} difficulty='easy' description={doc.data().description} />
                })}
            </div>
        </>
    )
}

export default SelectProblem