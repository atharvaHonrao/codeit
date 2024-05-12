import "./editor.css"
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from '../utilities/firebase.js'
import { useState } from "react";


export default function Problem(props) {
    return (
        <ProblemCode name={props.title} description={props.description} ></ProblemCode>
    )


    function ProblemCode(props) {
        // console.log("hereeee")
        // console.log(props)
        return (
            <div className="problem-container">
                {/* <h1>rhwfgvbwhihjb</h1> */}
                <h1>{props.name}</h1>

                <p>{props.description}</p>
                {/* <p>{props.image}</p> */}
            </div>
        )
    }


}


