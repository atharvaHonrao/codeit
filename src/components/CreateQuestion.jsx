import { checkActionCode, confirmPasswordReset } from 'firebase/auth'
import React, { useState, useRef } from 'react'
import '../styles/creategroup.css'
import { async } from '@firebase/util';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../utilities/firebase'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


function CreateQuestion(props) {

  // console.log(props.id)

  const [questions, setQuestions] = useState(
    { name: 'abc', description: 'xyz', testCases: [{ input: '', solution: '' }] }
  );

  const [testCases, setTestCases] = useState([])
  const [currentTestCase, setCurrentTestCase] = useState('')
  const [currentExpt, setCurrentExpt] = useState('')
  const [queTitle, setQueTitle] = useState('')
  const [queDisc, setQueDisc] = useState('')
  const [dummyFather, setdummyFather] = useState({ name: '', description: '', testCases: [{ input: '', solution: '' }] })

  const inputRef1 = useRef()
  const inputRef2 = useRef()

  const closePop = () => {
    props.changeBoolState(!props.boolState)
  }
  const containerClass = props.boolState ? 'cgcontainer visible' : 'cgcontainer';

  const handleNewTestCase = (e) => {
    // console.log(e.target.value);
    // console.log(typeof (e.target.value));
    setCurrentTestCase(e.target.value)
  }

  const handleNewExptCase = (e) => {
    // console.log(e.value);
    // console.log(typeof (e.value));
    setCurrentExpt(e.target.value)
  }

  const handleSubmitTestCase = () => {
    // let numberStrings = currentTestCase.split(',');
    // let integers = numberStrings.map((numberString) => parseInt(numberString, 10));
    // setdummyChild1(integers);
    // // console.log("dummyChild1")
    // // console.log(dummyChild1)
    // numberStrings = currentExpt.split(',');
    // integers = numberStrings.map((numberString) => parseInt(numberString, 10));
    // setdummyChild2(integers);
    // // console.log("dummyChild2")
    // // console.log(dummyChild2)
    // let mergedArray = [dummyChild1,dummyChild2];
    // // console.log("merged array")
    // // console.log(mergedArray)
    // setdummyFather([dummyChild1,dummyChild2]);
    // // console.log("dummyFather")
    // // console.log(dummyFather)
    // mergedArray = [...testCases, dummyFather]
    // setTestCases(mergedArray)
    // // console.log("testCases  ")
    // // console.log(testCases)
    // final array = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
    // final array = [
    //   {
    //     input: '1 2',
    //     output: '2 3'
    //   },
    //   {
    //     input: '4 5',
    //     output: '6 7'
    //   }
    // ]
    // const numberStrings1 = currentTestCase.split(',');
    // const integers1 = numberStrings1.map((numberString) => parseInt(numberString, 10));

    // const numberStrings2 = currentExpt.split(',');
    // const integers2 = numberStrings2.map((numberString) => parseInt(numberString, 10));

    // Use the functional form of setState to ensure proper updates
    setdummyFather((prevDummyFather) => ({ name: queTitle, description: queDisc, testCases: [{ input: currentTestCase, solution: currentExpt }] }));
    setQuestions({ name: queTitle, description: queDisc, testCases: [...questions.testCases, { input: currentTestCase, solution: currentExpt }] });
    // setTestCases((prevTestCases) => [...prevTestCases, [integers1, integers2]]);
    // inputRef1.current.value=" "
    // inputRef2.current.value = " "
    if (!currentTestCase || !currentExpt) {
      const notyf = new Notyf({
        position: {
          x: "center",
          y: "top"
        }
      });
      // alert('Please enter both test case and expected values.');
      notyf.error('Please enter both test case and expected values.');

      // alert('Please enter both test case and expected values.');
      return;
    }
    setCurrentExpt("")
    setCurrentTestCase("")
    // removeEmptyTestCases()
    // console.log(questions)
  }

  const removeEmptyTestCases = async () => {
    const updatedQuestions = {
      ...questions,
      testCases: questions.testCases.filter(testCase => {
        // Remove test cases with both empty input and solution
        return testCase.input.trim() !== '' || testCase.solution.trim() !== '';
      })
    };

    // Update the state with the filtered test cases
    setQuestions(updatedQuestions);
  };

  const handleRemoveTestCase = (index) => {
    const updatedTestCases = [...questions.testCases];
    updatedTestCases.splice(index, 1);
    // console.log(questions)
    setQuestions({ ...questions, testCases: updatedTestCases });
  };

  const handleSubmit = async () => {
    // console.log("final")


    // removeEmptyTestCases()
    // // console.log(questions.pop)


    // console.log("before",questions)

    questions.testCases.shift()

    // console.log("after",questions)

    // // console.log(props.id)

    // removeEmptyTestCases()

    const docRef1 = await addDoc(collection(db, "groups", props.id, "problems"), {
      name: questions.name,
      description: questions.description,
      testCases: questions.testCases,

    });

    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top"
      }
    });
    // alert('Please enter both test case and expected values.');
    notyf.success('New Question Added');
    props.changeBoolState(!props.boolState)


  }

  return (
    <div className={`flex ${containerClass}`}>
      <div className="cgoverlay flex">
        <div className="cgmainbody ">
          <button className='cgcancle-btn' onClick={closePop}>X</button>
          <h1 className='cgtitle'>Create Your Question</h1>
          {/* {questions.map((question, queIndex) => {
            return (
              <div key={queIndex}> */}
          <div className="flex">
            <div className="cqleftdiv">
              <h2>Question Name</h2>
              <input placeholder='Enter question title here' onChange={(e) => {
                setQueTitle(e.target.value)
              }}></input>
              <h2 style={{ marginTop: '20px' }}>Question Description</h2>
              <textarea placeholder='Describe your question...' onChange={(e) => {
                setQueDisc(e.target.value)
              }} />
            </div>
            <div className="cqrightdiv">
              <h2 style={{ marginBottom: '5px' }}>Test Cases</h2>
              <div className="cqtestcases">
                <div className="flex completeTestCase">
                  {questions.testCases.length > 1 && (
                    <div className="flex completeTestCase" style={{ marginBottom: '10px', gap: '190px' }}>
                      <h2>Input</h2>
                      <h2>Solution</h2>
                    </div>
                  )}

                </div>
                {questions.testCases.map((testCase, testCaseIndex) => (
                  <div key={testCaseIndex} className="completeTestCase flex ">
                    <div className='completeTestCase flex'>
                      {testCase.input && (
                        <input type="text" value={testCase.input} />
                      )}
                      {testCase.solution && (
                        <div>
                          <input type="text" value={testCase.solution} />
                        </div>
                      )}
                    </div>
                    {testCase.solution && (<button onClick={() => handleRemoveTestCase(testCaseIndex)} className="cqremoveCaseBtn">X</button>)}
                  </div>
                ))}
                {/* {testCases.map((fatherArray, fatherIndex) => (
                        <div key={fatherIndex}>
                          <div className="completeTestCase flex">
                            <input type="text" value={fatherArray[0]} />
                            <input type="text" value={fatherArray[1]} />
                          </div> */}
                {/* {fatherArray.map((childArray, childIndex) => (
                    <div key={childIndex}>
                      <h2>Test Case</h2>
                      <input type="text" value={childArray[0]} />
                      <input type="text" value={childArray[1]} />
                    </div>
                  ))} */}
              </div>
              {/* ))} */}
              <h2 style={{ marginTop: '20px' }}> Create new Test Case</h2>
              <div className="completeTestCase flex">
                <input ref={inputRef1} value={currentTestCase} placeholder='Enter your test cases' onChange={handleNewTestCase}></input>
                <input ref={inputRef2} value={currentExpt} placeholder='Enter expected values' onChange={handleNewExptCase}></input>
              </div>
              <div className="cgctrl-btns flex">
                <button className="cgsubmit-btn" onClick={handleSubmitTestCase} style={{ backgroundColor: 'rgb(25, 0, 117)', color: 'white' }}>Add Case</button>
              </div>
              <div className="cgctrl-btns flex">
                <button className="cgsubmit-btn" onClick={handleSubmit}>Create</button>
                <button className="cgcancel-btn">Cancel</button>
              </div>
            </div>

          </div>
        </div>
        {/* </div>)
          })} */}
      </div>
    </div>
  )
}

export default CreateQuestion