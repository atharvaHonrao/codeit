import React, { useState } from 'react';
import '../styles/creategroup.css';
import exampaper from '../assets/exampaper.png';
import CreateQuestion from './CreateQuestion';

function CreateTest(props) {
    const initialQuestions = [
        { name: 'abc', description: 'xyz', testCases: [{ input: '1', solution: '1' }] },
        { name: 'pqr', description: 'rst', testCases: [{ input: '1', solution: '1' }] },
        { name: 'lmn', description: 'uvw', testCases: [{ input: '1', solution: '1' }] }
    ];
    const closePop = () => {
        props.changeBoolState(!props.boolState)
    }

    // Initialize an array of states, one for each accordion item
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

        console.log(queIndex)
        const updatedselectedIndex = new Set(selectedIndex);

        if (updatedselectedIndex.has(queIndex)) {
            updatedselectedIndex.delete(queIndex);
        } else {
            updatedselectedIndex.add(queIndex);
        }
        console.log(Array.from(updatedselectedIndex))
        setselectedIndex(Array.from(updatedselectedIndex));
    };

    const handleFinalSubmit = () => {
        const selectedQuestions = selectedIndex.map(queIndex => initialQuestions[queIndex]);
        // Now, selectedQuestions will contain the selected questions from initialQuestions.
        // You can do whatever you want with the selected questions here.
        console.log(selectedQuestions);
        // For example, you can send them to an API or perform any other operations.
    };

    const [isGroupVisible, setGroupVisible] = useState(false)
    const handleGroup = () => {
        setGroupVisible(!isGroupVisible)
    };


    // =-----------------------------------------------------------------------------------------------


    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('');
    const [questions, setQuestions] = useState([
        { name: '', description: '', testCases: [{ input: '', solution: '' }] },
    ]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { name: '', description: '', testCases: [{ input: '', solution: '' }] }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleAddTestCase = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].testCases.push({ input: '', solution: '' });
        setQuestions(updatedQuestions);
    };

    const handleTestCaseChange = (questionIndex, testCaseIndex, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].testCases[testCaseIndex][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        // Handle form submission here
        console.log({
            testName,
            testDescription,
            questions,
        });

        let i = 0;

        const docRef = await addDoc(collection(db, "groups", "ucmhzyng", "test"), {
            name: testName,
            testDescription: testDescription,
        });
        console.log("Document written with ID: ", docRef.id);

        for (i = 0; i < questions.length; i++) {

            const docRef1 = await addDoc(collection(db, "groups", "ucmhzyng", "test", docRef.id, "problems"), {
                name: questions[i].name,
                description: questions[i].description,
                testcases: questions[i].testCases,
            });
            //   console.log("Document written with ID: ", docRef.id);
        }
        for (i = 0; i < questions.length; i++) {
            const docRef1 = await addDoc(collection(db, "groups", "ucmhzyng", "problems"), {
                name: questions[i].name,
                description: questions[i].description,
                testCases: questions[i].testCases,

            });
        }

    };

    return (
        <>
            {isGroupVisible ? <CreateQuestion boolState={isGroupVisible} changeBoolState={setGroupVisible}
                testName={testName} setTestName={setTestName}
                questions={questions} setQuestions={setQuestions} handleQuestionChange={handleQuestionChange}
                handleAddQuestion={handleAddQuestion} handleTestCaseChange={handleTestCaseChange}
                handleAddTestCase={handleAddTestCase}



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
                                                        <div className={`accordion-title ${isOpen ? 'open' : ''}`} onClick={() => toggleAccordion(queIndex)}>{question.name}</div>
                                                        <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
                                                            <div className="queDisc accordion-content">{question.description}</div>
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
                                    <button className="ctsubmit-btn" onClick={handleFinalSubmit}>Cancle</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default CreateTest;
