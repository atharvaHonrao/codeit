import React from 'react'
import "../styles/problemrow.css"
import { useNavigate } from 'react-router-dom';
function ProblemInSelection(props) {
const navigate = useNavigate();
    return (
        <div className='flex problemrow'>
            <div className='problem-left'>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            <p>{props.id}</p>
            </div>
            <div className='problem-right flex'>
                {/* <h3>{props.difficulty}</h3> */}
                <button onClick={() => {
                    navigate(`/editor/${props.id}`,
                     { state: { title: props.title, description: props.description, testcases: props.testcases}
                    }
                    );
                }}>Solve Now!</button>
            </div>
        </div>
    )
}

export default ProblemInSelection
