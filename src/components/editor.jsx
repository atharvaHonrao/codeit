import React, { useState, onChange, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { pythonLanguage } from "@codemirror/lang-python";
import { cppLanguage } from "@codemirror/lang-cpp";
import { javaLanguage } from "@codemirror/lang-java";
import "./editor.css"
import Select from 'react-select';
import { signOut } from "firebase/auth";
import Problem from "./problem";
import Navbar from "./navbar/navbar";
import { useParams } from "react-router-dom";
import { db } from '../utilities/firebase'
import { collection, getDocs, getDoc, doc } from "firebase/firestore";



function Editor({title, description}) {
  
  const {id} = useParams()
  const [langcode, setLangCode] = useState(54)
  const [langextension, setLangExtension] = useState(cppLanguage)
  const [problem, setProblem] = useState({})

  useEffect(() => {
      // get doc from firebase
      const fetchQuestions = async () => {
        const docRef = doc(db, "problems", id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap) //
        console.log('afhuwshfu')
        // debugger
        setProblem(docSnap.data())
    }
    fetchQuestions()
  }, [])

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

  const [output, setOutput] = useState("");

  const handleChange = React.useCallback(
    (value, viewUpdate) => {
      setCode(value);
    },
    [code]
  );

  let data = JSON.stringify({
    source_code: code,
    language_id: langcode,  // should be dynamic
    number_of_runs: null,
    stdin: null, // should be dynamic
    expected_output: null, // should be dynamic
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
  });

  let options = {

    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,

  }

  const handleButtonClick = () => {
    console.log(options)
    let postRequest = fetch("http://codeit.ddns.net:2358/submissions", options)

    postRequest.then((response) => response.json()).then((json) => checkStatusAndHandleResponse(json.token))

  };

  function checkStatusAndHandleResponse(token) {
    console.log("hi")

    let getRequest = fetch("http://codeit.ddns.net:2358/submissions" + "/" + token)

    getRequest.then((response) => {
      console.log(response)
      return response.json()
    })
      .then((answer) => {
        console.log(answer.status.description)
        if (answer.status.description == "In Queue" || answer.status.description == "Processing") {
          setTimeout(() => checkStatusAndHandleResponse(token), 1500)
        } else if (answer.status.description == "Error") {
          console.log("error")
        }
        else {
          console.log(answer)
          setOutput(answer.stdout)
        }
      })
  }
  console.log(title)
  return (
    <>
    <Navbar/>
    <Problem title={problem.title} description={problem.description} 
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
      <button onClick={handleButtonClick}>Submit</button>
      <div>
        <h3>Output</h3>
        <div style={{ "whiteSpace": "pre-wrap", "backgroundColor": "black", 'color': 'white',  'height': 300, 'width': 700}}>{output}</div>
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
