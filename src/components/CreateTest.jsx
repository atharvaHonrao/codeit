import React, { useState } from 'react';
import '../styles/creategroup.css';
import exampaper from '../assets/exampaper.png';

function CreateTest() {
    const initialQuestions = [
        { name: 'abc', description: 'xyz', testCases: [{ input: '1', solution: '1' }] },
        { name: 'pqr', description: 'rst', testCases: [{ input: '1', solution: '1' }] },
        { name: 'lmn', description: 'uvw', testCases: [{ input: '1', solution: '1' }] }
    ];

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

    return (
        <div>
            <div className='flex'>
                <div className="cgoverlay flex">
                    <div className="cgmainbody">
                        <button className='cgcancle-btn'>X</button>
                        <div className='ctheader flex'>
                            <h1>Create New Test</h1>
                            <img src={exampaper} alt="" className="exampaperimg" />
                        </div>
                        <div className=" ctbody">
                            <div className='ctbodyinputs flex'>
                                <div className="ctbodyinputsleft flex">
                                    <h2>Test Name :</h2>
                                    <input></input>
                                </div>
                                <div className="ctbodyinputsright flex">
                                    <h2>Test Description :</h2>
                                    <textarea></textarea>
                                </div>
                            </div>
                            <div className="ctbodyheader flex ">
                                <h2>Select Questions from Inventory</h2>
                                <button >+ New Question</button>
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
                                            <button onClick={() => toggleSelectQuestion(queIndex)} className={`ctSelect-btn ${isSelect ? "ctSelect-btn-red": 'ctSelect-btn-blue'}`}>
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
        </div>
    );
}

export default CreateTest;
