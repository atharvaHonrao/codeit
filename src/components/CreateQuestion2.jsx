// import { checkActionCode } from 'firebase/auth'
// import React, { useState, useRef } from 'react'
// import '../styles/creategroup.css'
// function CreateQuestion({ boolState, changeBoolState }) {

//   const [questions, setQuestions] = useState(
//     { name: 'abc', description: 'xyz', testCases: [{ input: '', solution: '' }] }
//   );

//   const [testCases, setTestCases] = useState([])
//   const [currentTestCase, setCurrentTestCase] = useState('')
//   const [currentExpt, setCurrentExpt] = useState('')
//   const [queTitle, setQueTitle] = useState('')
//   const [queDisc, setQueDisc] = useState('')
//   const [dummyFather, setdummyFather] = useState({ name: '', description: '', testCases: [{ input: '', solution: '' }] })

//   const inputRef1 = useRef()
//   const inputRef2 = useRef()

//   const closePop = () => {
//     changeBoolState(!boolState)
//   }
//   const containerClass = boolState ? 'cgcontainer visible' : 'cgcontainer';

//   const handleNewTestCase = (e) => {
//     // console.log(e.target.value);
//     // console.log(typeof (e.target.value));
//     setCurrentTestCase(e.target.value)
//     handleAddTestCase(questionIndex)
//   }

//   const handleNewExptCase = (e) => {
//     // console.log(e.value);
//     // console.log(typeof (e.value));
//     setCurrentExpt(e.target.value)
//   }

//   const [isGroupVisible, setGroupVisible] = useState(false)
//   const handleGroup = () => {
//     setGroupVisible(!isGroupVisible)
//   };

//   const handleSubmitTestCase = () => {
//     // let numberStrings = currentTestCase.split(',');
//     // let integers = numberStrings.map((numberString) => parseInt(numberString, 10));
//     // setdummyChild1(integers);
//     // // console.log("dummyChild1")
//     // // console.log(dummyChild1)
//     // numberStrings = currentExpt.split(',');
//     // integers = numberStrings.map((numberString) => parseInt(numberString, 10));
//     // setdummyChild2(integers);
//     // // console.log("dummyChild2")
//     // // console.log(dummyChild2)
//     // let mergedArray = [dummyChild1,dummyChild2];
//     // // console.log("merged array")
//     // // console.log(mergedArray)
//     // setdummyFather([dummyChild1,dummyChild2]);
//     // // console.log("dummyFather")
//     // // console.log(dummyFather)
//     // mergedArray = [...testCases, dummyFather]
//     // setTestCases(mergedArray)
//     // // console.log("testCases  ")
//     // // console.log(testCases)
//     // final array = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
//     // final array = [
//     //   {
//     //     input: '1 2',
//     //     output: '2 3'
//     //   },
//     //   {
//     //     input: '4 5',
//     //     output: '6 7'
//     //   }
//     // ]
//     // const numberStrings1 = currentTestCase.split(',');
//     // const integers1 = numberStrings1.map((numberString) => parseInt(numberString, 10));

//     // const numberStrings2 = currentExpt.split(',');
//     // const integers2 = numberStrings2.map((numberString) => parseInt(numberString, 10));

//     // Use the functional form of setState to ensure proper updates
//     // setdummyFather((prevDummyFather) => ({ name: queTitle, description: queDisc, testCases: [{ input: currentTestCase, solution: currentExpt }] }));
//     // setQuestions({ name: queTitle, description: queDisc, testCases: [...questions.testCases, { input: currentTestCase, solution: currentExpt }] });
//     // setTestCases((prevTestCases) => [...prevTestCases, [integers1, integers2]]);
//     // inputRef1.current.value=" "
//     // inputRef2.current.value = " "
//     if (!currentTestCase || !currentExpt) {
//       alert('Please enter both test case and expected values.');
//       return;
//     }
//     setCurrentExpt("")
//     setCurrentTestCase("")
//     // console.log("testCases  ")
//     // console.log(testCases)
//     // console.log("FinalArray  ")
//     // console.log(questions)
//   }

//   const handleRemoveTestCase = (index) => {
//     const updatedTestCases = [...questions.testCases];
//     updatedTestCases.splice(index, 1);
//     // console.log(questions)
//     setQuestions({ ...questions, testCases: updatedTestCases });
//   };

//   return (
//     <div className={`flex ${containerClass}`}>
//       <div className="cgoverlay flex">
//         <div className="cgmainbody ">
//           <button className='cgcancle-btn' onClick={closePop}>X</button>
//           <h1 className='cgtitle'>Create Your Question</h1>
//           {/* {questions.map((question, queIndex) => {
//             return (
//               <div key={queIndex}> */}
//           <div className="flex">
//             <div className="cqleftdiv">
//               <h2>Question Name</h2>
//               <input placeholder='Enter question title here' type="text"
//                 value={question.name}
//                 onChange={(e) => handleQuestionChange(questionIndex, 'name', e.target.value)}
//               ></input>
//               <h2 style={{ marginTop: '20px' }}>Question Description</h2>
//               <textarea placeholder='Describe your question...' value={question.description}
//                 onChange={(e) => handleQuestionChange(questionIndex, 'description', e.target.value)} />
//             </div>
//             <div className="cqrightdiv">
//               <h2 style={{ marginBottom: '5px' }}>Test Cases</h2>
//               <div className="cqtestcases">
//                 <div className="flex completeTestCase">
//                   {questions.testCases.length > 1 && (
//                     <div className="flex completeTestCase" style={{ marginBottom: '10px', gap: '190px' }}>
//                       <h2>Input</h2>
//                       <h2>Solution</h2>
//                     </div>
//                   )}

//                 </div>
//                 {questions.testCases.map((testCase, testCaseIndex) => (
//                   <div key={testCaseIndex} className="completeTestCase flex ">
//                     <div className='completeTestCase flex'>
//                       {testCase.input && (
//                         <input type="text" value={testCase.input}
//                         onChange={(e) =>
//                           handleTestCaseChange(questionIndex, testCaseIndex, 'input', e.target.value)
//                       }                    
//                         />
//                       )}
//                       {testCase.solution && (
//                         <div>
//                           <input type="text" value={testCase.solution} 
//                           onChange={(e) =>
//                             handleTestCaseChange(questionIndex, testCaseIndex, 'solution', e.target.value)
//                         } 
//                           />
//                         </div>
//                       )}
//                     </div>
//                     {testCase.solution && (<button onClick={() => handleRemoveTestCase(testCaseIndex)} className="cqremoveCaseBtn">X</button>)}
//                   </div>
//                 ))}
//                 {/* {testCases.map((fatherArray, fatherIndex) => (
//                         <div key={fatherIndex}>
//                           <div className="completeTestCase flex">
//                             <input type="text" value={fatherArray[0]} />
//                             <input type="text" value={fatherArray[1]} />
//                           </div> */}
//                 {/* {fatherArray.map((childArray, childIndex) => (
//                     <div key={childIndex}>
//                       <h2>Test Case</h2>
//                       <input type="text" value={childArray[0]} />
//                       <input type="text" value={childArray[1]} />
//                     </div>
//                   ))} */}
//               </div>
//               {/* ))} */}
//               <h2 style={{ marginTop: '20px' }}> Create new Test Case</h2>
//               <div className="completeTestCase flex">
//                 <input ref={inputRef1} value={currentTestCase} placeholder='Enter your test cases' onChange={handleNewTestCase}></input>
//                 <input ref={inputRef2} value={currentExpt} placeholder='Enter expected values' onChange={handleNewExptCase}></input>
//               </div>
//               <div className="cgctrl-btns flex">
//                 <button className="cgsubmit-btn" onClick={handleSubmitTestCase} style={{ backgroundColor: 'rgb(25, 0, 117)', color: 'white' }}>Add Case</button>
//               </div>
//               <div className="cgctrl-btns flex">
//                 <button className="cgsubmit-btn" onClick={handleSubmitTestCase}>Create</button>
//                 <button className="cgcancel-btn">Cancel</button>
//               </div>
//             </div>

//           </div>
//         </div>
//         {/* </div>)
//           })} */}
//       </div>
//     </div>
//   )
// }

// export default CreateQuestion