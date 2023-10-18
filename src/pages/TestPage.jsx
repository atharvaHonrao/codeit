import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { doc, getDocs, getDoc, collection } from 'firebase/firestore'
import { db } from '../utilities/firebase'
import { useStateWithCallbackLazy } from "use-state-with-callback";
import ProblemInSelection from '../components/ProblemInSelection';

function TestPage() {

    const { id } = useParams()
    const [questions, setQuestions] = useState([])
    const Location = useLocation()
    const [test, setTest] = useStateWithCallbackLazy({
        name: "",
        testDescription: "",
    })

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


            // console.log(questionSnap)
            const docs = querySnapshot.docs.map(doc => doc)
            setQuestions(docs)
        }

        fetchQuestions()

    }, [])

    return (
        <>
            <h1>TestPage {id}</h1>
            <div>
                <div>
                    {test.name}
                </div>
                <div>
                    {test.testDescription}
                </div>
                <div className="table-container">
                    {questions.map((doc) => {
                        // console.log(doc.id)
                        return <ProblemInSelection id={doc.id} classname='problemrow' title={doc.data().name} difficulty='easy' description={doc.data().description} testcases={doc.data().testcases} />
                    })}
                </div>
            </div>
        </>
    )
}

export default TestPage