import React, { useState, onChange, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { pythonLanguage } from "@codemirror/lang-python";
import { cppLanguage } from "@codemirror/lang-cpp";
import { javaLanguage } from "@codemirror/lang-java";
import "../components/editor.css"
import Select from 'react-select';
import { signOut } from "firebase/auth";
import Problem from "./problem";
import Navbar from "./navbar/navbar";
import { useLocation, useParams } from "react-router-dom";
import { db } from '../utilities/firebase'
import { collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";

function Editor({ title, description }) {

  const { id } = useParams()
  const [langcode, setLangCode] = useState(54)
  const [langextension, setLangExtension] = useState(cppLanguage)
  const [problem, setProblem] = useState({})

  const Location = useLocation()
  console.log(Location.state.testcases)
  const testcases = Location.state.testcases

  const langs = [
    { value: 50, label: "C" },
    { value: 54, label: "C++" },
    { value: 68, label: "Java" },
    { value: 71, label: "python" },
  ]

  const langextensions = {
    50: cppLanguage,
    54: cppLanguage,
    68: javaLanguage,
    71: pythonLanguage
  }

  function handleLangChange(event) {
    setLangCode(event.value)
    setLangExtension(langextensions[event.value])
    console.log(langcode)
    console.log(langextension)
  }

  const [code, setCode] = useState("");
  const [status, setStatus] = useState("Not Submitted")
  const [output, setOutput] = useState("");

  const handleChange = React.useCallback(
    (value, viewUpdate) => {
      setCode(value);
    },
    [code]
  );

  const handleButtonClick = () => {
    // console.log("opptitoj ",options)
    let i = 0
    let submissions = []
    for (i = 0; i < testcases.length; i++) {
      submissions.push({
        source_code: code,
        language_id: langcode,  // should be dynamic
        number_of_runs: null,
        stdin: testcases[i].input, // should be dynamic
        expected_output: testcases[i].solution, // should be dynamic  
        cpu_time_limit: null,
        cpu_extra_time: null,
        wall_time_limit: null,
        memory_limit: null,
        stack_limit: null,
        max_processes_and_or_threads: null,
        enable_per_process_and_thread_time_limit: null,
        enable_per_process_and_thread_memory_limit: null,
        max_file_size: null,
        enable_network: null,
      })
    }
    let options = {

      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        "submissions": submissions
      })
    }

    console.log(submissions)
    let postRequest = fetch("http://codeit.ddns.net:2358/submissions/batch", options)

    // console.log(postRequest)

    postRequest.then((response) => response.json()).then((json) => {

      console.log(json)
      let x = 0
      let y = ''
      for (x = 0; x < json.length; x++) {
        y = y + json[x].token + ','
      }
      console.log(y)

      checkStatusAndHandleResponse(y)
    }
      // console.log(json)
    ).catch((err) => console.log(err))

  };

  const handleSubmit = async () => {


    // console.log(options)
    // let postRequest = fetch("http://codeit.ddns.net:2358/submissions", options)

    // postRequest.then((response) => response.json()).then((json) => checkStatusAndHandleResponse(json.token))


    // console.log("after math")


    const docRef1 = await addDoc(collection(db, "groups", "BhGrVWAmUjxXnm6CaqtE", "test", "nAoCyOlJXcl9TvBBe6hf", "problems", "tyxBeUWHX3n8KU5WpQ8N", "code"), {
      code: code,
    });
  }
  function checkStatusAndHandleResponse(token) {


    let getRequest = fetch("http://codeit.ddns.net:2358/submissions/batch?tokens=" + token + " fields=stdout,time,memory,stderr,compile_output,message,status")

    getRequest.then((response) => {
      // console.log(response.json())

      return response.json()
    })
      .then((answer) => {
        // setStatus(answer.status.description)
        let submissions = answer.submissions
        let c = 0
        let output = ''
        console.log(submissions)

        for (c = 0; c < submissions.length; c++) {

          let state = submissions[c].status.description
          setStatus(state)
          if (state == "In Queue" || state == "Processing" && state!=null) {
            setTimeout(() => checkStatusAndHandleResponse(token), 1500)
          } else if (state == "Error") {
            console.log("error")
          }
          else {

            output= output + submissions[c].stdout+'\n'
            // setOutput(submissions[c].stdout)
            // console.log(answer.stdout)
          }
          setOutput(output)
          console.log(output)
        }
      }
      )
  }
  return (
    <>
      <Navbar />
      <Problem title={Location.state.title} description={Location.state.description}
      // expOutput={props.expOutput} input={props.input}
      />
      <div className="editor-container">
        <div>
          <div className="editor-options">
            <Select className="select" options={langs} value={langs.value} onChange={handleLangChange} />
          </div>
          <CodeMirror
            value={code}
            height="70vh"
            onChange={handleChange}
            extensions={langextension}
            theme={vscodeDark}
          />
        </div>
        <button onClick={handleButtonClick}>Run</button>
        <button onClick={handleSubmit}>Submit</button>
        <div>
          <h3>Output</h3>
          <h2>Status : {status}</h2>
          <div style={{ "whiteSpace": "pre-wrap", "backgroundColor": "black", 'color': 'white', 'height': 100, 'width': 700 }}>{output}</div>
          <h2>Status : {status}</h2>
          <div style={{ "whiteSpace": "pre-wrap", "backgroundColor": "black", 'color': 'white', 'height': 100, 'width': 700 }}>{output}</div>
        </div>
        {/* <button onClick={
        async () => {
          signOut(auth).then(() => {
            console.log("Signed out")
          }).catch((error) => {
            // An error happened.
          });
      }}>Signout</button> */}
        {/* <p>{props.title}</p> */}
      </div></>
  );
}

export default Editor;