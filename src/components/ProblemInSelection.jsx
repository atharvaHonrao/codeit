import React from 'react'
import "../styles/problemrow.css"
import { useNavigate } from 'react-router-dom';
import '../styles/creategroup.css'
function ProblemInSelection(props) {
const navigate = useNavigate();
console.log(props.testcases)
console.log(props.testId)
    return (
        <div className='flex problemrow'>
            <div className='problem-left' style={{'textTransform':'capitalize'}}>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            {/* <p>{props.id}</p> */}
            </div>
            <div className='problem-right flex'>
                {/* <h3>{props.difficulty}</h3> */}
                <button className="ctsubmit-btn" onClick={() => {
                    navigate(`/editor/${props.id}`,
                     { state: { title: props.title, description: props.description, testcases: props.testcases, testId:props.testId}
                    }
                    );
                }}>Solve Now!</button>
            </div>
        </div>
    )
}

export default ProblemInSelection
