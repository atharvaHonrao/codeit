import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { doc, getDocs, getDoc, collection, queryEqual } from 'firebase/firestore'
import { db } from '../utilities/firebase'
import { useStateWithCallbackLazy } from "use-state-with-callback";
import ProblemInSelection from '../components/ProblemInSelection';
import '../styles/adminsubmit.css'
import '../styles/creategroup.css'

function AdminSubmissionPage() {

  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const Location = useLocation()
  const [test, setTest] = useStateWithCallbackLazy({
    name: "",
    testDescription: "",
  })

  const [submission, setSubmission] = useState([])

  useEffect(() => {
    const fetchTest = async () => {
      const docRef = doc(db, "groups", Location.state.gid, "test", id);
      const docSnap = await getDoc(docRef);

      // // console.log(docSnap.data())
      setTest({
        name: docSnap.data().name,
        testDescription: docSnap.data().testDescription,
      })
    }
    fetchTest()

    const fetchQuestions = async () => {

      const querySnapshot = await getDocs(collection(db, "groups", Location.state.gid, "test", id, "problems"));
      const docs = querySnapshot.docs.map(doc => doc)
      setQuestions(docs)


      const submissionPromises = docs.map(async (doc) => {
        const lul = await fetchSubmission(doc.id);
        const data = lul.map(submission => submission.data());
        return data;
      });

      const submissionData = await Promise.all(submissionPromises);

      setSubmission(submissionData);

      // let i =0
      // let x = []
      // let y = ''

      // for (i = 0; i < docs.length; i++) {

      //   y = fetchSubmission(docs[i].id)
      //   y.then((lul)=>{

      //     let p = 0
      //     let data = []

      //     for(p=0;p<lul.length;p++){
      //       data.push(lul[p].data())
      //     }
      //     // x.push(data)
      //     setSubmission([...submission,data])
      //     // console.log(data)

      //   })
      // }
      // setSubmission(x)
      // // console.log("xxxxxxxxxx",x)
    }

    const fetchSubmission = async (idc) => {

      const querySnapshot2 = await getDocs(collection(db, "groups", Location.state.gid, "test", id, "problems", idc, "submissions"));
      const docs2 = querySnapshot2.docs.map(doc => doc)
      let y = docs2
      return y
    }
    fetchQuestions()

  }, [])

  // console.log("sssssssssssss", submission)

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
                        // // console.log(doc.id)
                        return <ProblemInSelection id={doc.id} classname='problemrow' title={doc.data().name} difficulty='easy' description={doc.data().description} testcases={doc.data().testcases} />
                    })} */}
        </div>
      </div>
      <div>
        {/* {questions.map((question,qindex) => (
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
                    <td>{submission[qindex]}</td>
                    <td>{submission[qindex][index].name}</td>
                    <td>{submission[qindex][index].name}</td>
                    <td>
                      <code>{submission[qindex][index].name}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))} */}

        {questions.map((question, qindex) => (

          <div className='ascontainer' key={question.id}>
            <h2>{question.data().name}</h2>
            <h3>{question.data().description}</h3>
          </div>
        ))}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Test Cases Passed</th>
              <th>Complete Time</th>
              <th>Code</th>
            </tr>
          </thead>

          {submission.map((submissionData, index) => (


            <tbody className='tbodys'>
              {submissionData.map((submissionData, index) => (
                <tr key={index}>
                  <td>{submissionData.name}</td>
                  <td>{submissionData.testcasesPassed}</td>
                  <td>{submissionData.time}</td>
                  <td>{submissionData.code}</td>
                </tr>
              ))}
            </tbody>
            // <tr key={index}>
            //   <td>{submissionData[0].name}</td>
            //   <td>{submissionData[0].tescasesPassed}</td>
            //   <td>{submissionData[0].time}</td>
            //   <td>{submissionData[0].code}</td>
            // </tr>
          ))}

        </table>




      </div>
    </>
  )
}

export default AdminSubmissionPage
