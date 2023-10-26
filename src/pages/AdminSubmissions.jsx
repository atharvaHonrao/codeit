import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { doc, getDocs, getDoc, collection } from 'firebase/firestore'
import { db } from '../utilities/firebase'
import { useStateWithCallbackLazy } from "use-state-with-callback";
import ProblemInSelection from '../components/ProblemInSelection';
import '../styles/adminsubmit.css'

function AdminSubmissionPage() {

    const { id } = useParams()
    const [questions, setQuestions] = useState([])
    const Location = useLocation()
    const [test, setTest] = useStateWithCallbackLazy({
        name: "",
        testDescription: "",
    })

    const [submission,setSubmission] = useState([])

    useEffect(() => {
        const fetchTest = async () => {
            const docRef = doc(db, "groups", Location.state.gid, "test", id);
            const docSnap = await getDoc(docRef);

            // console.log(docSnap.data())
            setTest({
                name: docSnap.data().name,
                testDescription: docSnap.data().testDescription,
            })
        }
        fetchTest()

        const fetchQuestions = async () => {

            console.log(id)
            const querySnapshot = await getDocs(collection(db, "groups", Location.state.gid, "test", id, "problems"));
            // console.log(questionSnap)
            const docs = querySnapshot.docs.map(doc => doc)
            setQuestions(docs)

            console.log(docs)

            let i=0
            for(i=0;i<docs.length-1;i++){
                console.log("weoirjioij",docs[i].id)
                const querySnapshot2 = await getDocs(collection(db, "groups", Location.state.gid, "test", id, "problems",docs[i].id,"submissions"));

            const docs2 = querySnapshot2.docs.map(doc => doc)
            setSubmission(docs2)
            // console.log("thiiiiiiiiiiiiiiiiiiiiii",submission)
            }   
        }
        fetchQuestions()

    }, [])

    console.log("suuuuuuuuubbbbbbbb",submission)

    return (
        <>
            {/* <h1>TestPage {id}</h1> */}
            <div className='Demo'>
                <h1>
                    {test.name}
                </h1>
                <h3>
                    {test.testDescription}
                </h3>
                <div className="table-container">
                    {/* {questions.map((doc) => {
                        // console.log(doc.id)
                        return <ProblemInSelection id={doc.id} classname='problemrow' title={doc.data().name} difficulty='easy' description={doc.data().description} testcases={doc.data().testcases} />
                    })} */}
                </div>
            </div>

            <div>
        {questions.map((question) => (
          <div className='ascontainer' key={question.id}>
            <h2>{question.data().name}</h2>
            <h3>{question.data().description}</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Test Cases Passed</th>
                  <th>Complete Time</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {submission.map((submission, index) => (
                  <tr key={index}>
                    <td>{submission.data().name}</td>
                    <td>{submission.data().testcasesPassed}</td>
                    <td>{submission.data().time}</td>
                    <td>
                      <code>{submission.data().code}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
        </>
    )
}

export default AdminSubmissionPage
