// src/components/TestForm.js

import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../utilities/firebase'

function TestForm() {
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

        const docRef = await addDoc(collection(db, "groups", "BhGrVWAmUjxXnm6CaqtE", "test"), {
            name: testName,
            testDescription: testDescription,
        });
        console.log("Document written with ID: ", docRef.id);

        for (i = 0; i < questions.length; i++) {

            const docRef1 = await addDoc(collection(db, "groups", "BhGrVWAmUjxXnm6CaqtE", "test", docRef.id, "problems"), {
                name: questions[0].name,
                description: questions[0].description,
                testCases: questions[0].testCases,

            });
            //   console.log("Document written with ID: ", docRef.id);
        }
    };

    return (
        <div>
            <h2>Create a New Test</h2>
            <form>
                <div>
                    <label>Test Name:</label>
                    <input
                        type="text"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Test Description:</label>
                    <textarea
                        value={testDescription}
                        onChange={(e) => setTestDescription(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Questions:</h3>
                    {questions.map((question, questionIndex) => (
                        <div key={questionIndex}>
                            <div>
                                <label>Question Name:</label>
                                <input
                                    type="text"
                                    value={question.name}
                                    onChange={(e) => handleQuestionChange(questionIndex, 'name', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Question Description:</label>
                                <textarea
                                    value={question.description}
                                    onChange={(e) => handleQuestionChange(questionIndex, 'description', e.target.value)}
                                />
                            </div>
                            <div>
                                <h4>Test Cases:</h4>
                                {question.testCases.map((testCase, testCaseIndex) => (
                                    <div key={testCaseIndex}>
                                        <label>Input:</label>
                                        <input
                                            type="text"
                                            value={testCase.input}
                                            onChange={(e) =>
                                                handleTestCaseChange(questionIndex, testCaseIndex, 'input', e.target.value)
                                            }
                                        />
                                        <label>Solution:</label>
                                        <input
                                            type="text"
                                            value={testCase.solution}
                                            onChange={(e) =>
                                                handleTestCaseChange(questionIndex, testCaseIndex, 'solution', e.target.value)
                                            }
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddTestCase(questionIndex)}>
                                    Add Test Case
                                </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddQuestion}>
                        Add Question
                    </button>
                </div>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default TestForm;
