import React, { useState, useEffect } from 'react';
import '../styles/creategroup.css';
import exampaper from '../assets/exampaper.png';
import CreateQuestion from './CreateQuestion';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../utilities/firebase'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function CreateTest(props) {


    useEffect(() => {
        const fetchQuestions = async () => {
            const querySnapshot = await getDocs(collection(db, "problems"));
            const querySnapshot2 = await getDocs(collection(db, "groups", props.id, "problems"));
            // console.log(querySnapshot) //
            // debugger
            const docs = querySnapshot.docs.map(doc => doc)
            const docs2 = querySnapshot2.docs.map(doc => doc)
            docs2.push(...docs)

            setInitialQuestions(docs2)
        }
        fetchQuestions()
    }, [])


    const [initialQuestions, setInitialQuestions] = useState([])

    useEffect(() => {
        const fetchQuestions = async () => {
            const querySnapshot = await getDocs(collection(db, "problems"));
            const querySnapshot2 = await getDocs(collection(db, "groups", props.id, "problems"));
            // console.log(querySnapshot) //
            // debugger
            const docs = querySnapshot.docs.map(doc => doc)
            const docs2 = querySnapshot2.docs.map(doc => doc)
            docs2.push(...docs)

            setInitialQuestions(docs2)
        }
        fetchQuestions()
    }, [])

    const closePop = () => {
        props.changeBoolState(!props.boolState)
    }
    const [openStates, setOpenStates] = useState(initialQuestions.map(() => false));
    const [selectStates, setSelectStates] = useState(initialQuestions.map(() => false));
    const [selectedIndex, setselectedIndex] = useState([])
    const [selectedQue, setselectedQue] = useState([])

    const toggleAccordion = (index) => {
        // Create a copy of the openStates array and toggle the state at the specified index
        const updatedOpenStates = [...openStates];
        updatedOpenStates[index] = !updatedOpenStates[index];
        setOpenStates(updatedOpenStates);
    };

    const toggleSelectQuestion = (queIndex) => {
        const updatedSelectStates = [...selectStates];
        updatedSelectStates[queIndex] = !updatedSelectStates[queIndex];
        setSelectStates(updatedSelectStates);

        // console.log(queIndex)
        const updatedselectedIndex = new Set(selectedIndex);

        if (updatedselectedIndex.has(queIndex)) {
            updatedselectedIndex.delete(queIndex);
        } else {
            updatedselectedIndex.add(queIndex);
        }
        // console.log(Array.from(updatedselectedIndex))
        setselectedIndex(Array.from(updatedselectedIndex));
    };

    let questions = [];
    const handleFinalSubmit = () => {
        selectedIndex.map(queIndex => {
            initialQuestions[queIndex]

            // console.log({ name: initialQuestions[queIndex].data().name, description: initialQuestions[queIndex].data().description, testCases: initialQuestions[queIndex].data().testCases })

            questions = [...questions, { name: initialQuestions[queIndex].data().name, description: initialQuestions[queIndex].data().description, testCases: initialQuestions[queIndex].data().testCases }];
        });
        handleSubmit()
    };
    const [isGroupVisible, setGroupVisible] = useState(false)
    const handleGroup = () => {
        setGroupVisible(!isGroupVisible)
    };

    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('');

    const handleSubmit = async () => {
        // console.log(questions)
        // Handle form submission here
        // console.log({
        // testName,
        //     testDescription,
        //     questions,
        // });

    let i = 0;

    const docRef = await addDoc(collection(db, "groups", props.id, "test"), {
        name: testName,
        testDescription: testDescription,
    });

    // console.log("Document written with ID:", docRef.id);

    for (i = 0; i < questions.length; i++) {

        const docRef1 = await addDoc(collection(db, "groups", props.id, "test", docRef.id, "problems"), {
            name: questions[i].name,
            description: questions[i].description,
            testcases: questions[i].testCases,
        });
    }
    const notyf = new Notyf({
        position: {
            x: "right",
            y: "top"
        }
    });
    // alert('Please enter both test case and expected values.');
    notyf.success('New Question Added');
    closePop()
};

return (
    <>
        {isGroupVisible ? <CreateQuestion boolState={isGroupVisible} changeBoolState={setGroupVisible} id={props.id}

        /> :
            <div>
                <div className='flex cgcontainer'>
                    <div className="cgoverlay flex">
                        <div className="cgmainbody">
                            <button className='cgcancle-btn' onClick={closePop}>X</button>
                            <div className='ctheader flex'>
                                <h1>Create New Test</h1>
                                <img src={exampaper} alt="" className="exampaperimg" />
                            </div>
                            <div className=" ctbody">
                                <div className='ctbodyinputs flex'>
                                    <div className="ctbodyinputsleft flex">
                                        <h2>Test Name :</h2>
                                        <input
                                            type="text"
                                            value={testName}
                                            onChange={(e) => setTestName(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="ctbodyinputsright flex">
                                        <h2>Test Description :</h2>
                                        <textarea
                                            value={testDescription}
                                            onChange={(e) => setTestDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="ctbodyheader flex ">
                                    <h2>Select Questions from Inventory</h2>
                                    <button onClick={handleGroup} >+ New Question</button>
                                </div>
                                {initialQuestions.map((question, queIndex) => {
                                    const isOpen = openStates[queIndex];
                                    const isSelect = selectStates[queIndex];
                                    return (
                                        <div key={queIndex} className={`accordion-wrapper ${isOpen ? 'selected' : ''}`}>
                                            <div className={`quetitle flex`}>
                                                <div>
                                                    <div className={`accordion-title ${isOpen ? 'open' : ''}`} onClick={() => toggleAccordion(queIndex)}>{

                                                        question.data().name}</div>
                                                    <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
                                                        <div className="queDisc accordion-content">{question.data().description}</div>
                                                    </div>
                                                </div>
                                                <button onClick={() => toggleSelectQuestion(queIndex)} className={`ctSelect-btn ${isSelect ? "ctSelect-btn-red" : 'ctSelect-btn-blue'}`}>
                                                    {isSelect ? 'Remove' : 'Add'}
                                                </button>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                            <div className="ctctrl-btns flex">
                                <button className="ctsubmit-btn" onClick={handleFinalSubmit}>Final submit</button>
                                {/* {/* <button className="ctsubmit-btn" onClick={handleFinalSubmit}>Cancle</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
    </>
);
}

export default CreateTest;
