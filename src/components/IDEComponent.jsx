import React, { useState, useEffect, useContext } from 'react';

// import Editor from '@monaco-editor/react';
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { githubLight } from '@uiw/codemirror-theme-github';
import { pythonLanguage } from "@codemirror/lang-python";
import { cppLanguage } from "@codemirror/lang-cpp";
import { javaLanguage } from "@codemirror/lang-java";
import Select from 'react-select';
import SubmissionComponent from '../components/SubmissionComponent';
import { addDoc } from 'firebase/firestore';
import { db } from '../utilities/firebase';
import { collection } from 'firebase/firestore';


import styles from '../styles/Ide.module.css';
// import { runCode, submitCode } from './modules';

export default function IdeComponent({ input, problemId, userId, testcases }) {
  // editor
  const [langcode, setLangCode] = useState(54)
  const [inputString, setInputString] = useState('')
  const [langextension, setLangExtension] = useState(cppLanguage)
  const [template, setTemplate] = useState('// some code here');
  const [theme, setTheme] = useState(vscodeDark);
  const [themeButton, setThemeButton] = useState('🌙');
  const [extension, setExtension] = useState('cpp');

  // submissions
  const [loading, setLoading] = useState(false);
  const [submission, setSubmission] = useState('');
  const [result, setResults] = useState('');
  const [typeSubmission, setTypeSubmission] = useState('');

  const [code, setCode] = useState("");
  const [status, setStatus] = useState("Not Submitted")
  const [output, setOutput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("") 


  const langs = [
    { value: 50, label: "C" },
    { value: 54, label: "C++" },
    { value: 68, label: "Java" },
    { value: 71, label: "Python" },
  ]

  const langextensions = {
    50: cppLanguage,
    54: cppLanguage,
    68: javaLanguage,
    71: pythonLanguage
  }

  const [testcaseString, settestcaseString] = useState('')
  const [execTime, setExecTime] = useState(0)

  useEffect(() => {
    const formattedTestcases = testcases.map(testcase => {
      const input = testcase.input || ''; // Handle cases where input may be missing
      // const solution = testcase.solution || ''; // Handle cases where solution may be missing
      return `${input}`;
  });
  
  settestcaseString(formattedTestcases.join('\n\n')); // Separate test cases with two new lines
  
  // console.log(testcaseString);
  },[])

  // useEffect(() => {
  //   setTemplate(templates[0] || '// some code here');
  //   setCode(templates[0] || '// some code here');
  // }, [, input, problemId, userId]);

  const handleChangeTheme = (e) => {
    e.preventDefault();

    if (themeButton === '🌙') {
      setTheme(githubLight);
      setThemeButton('🌞');

      return;
    }
    setTheme(vscodeDark);
    setThemeButton('🌙');
  };

  function handleLangChange(event) {
    setLangCode(event.value)
    setLangExtension(langextensions[event.value])
    console.log(langcode);
    console.log(langextension);
  }

  // const handleRunCode = () => {
  //   console.log(testcases)
  //   let i = 0
  //   let submissions = []
  //   for (i = 0; i < testcases.length; i++) {
  //     debugger
  //     console.log(testcases[i].input)
  //     submissions.push({
  //       source_code: btoa(`${code}`),
  //       language_id: langcode,  // should be dynamic
  //       number_of_runs: null,
  //       stdin: btoa(testcases[i].input), // should be dynamic
  //       expected_output: btoa(testcases[i].solution), // should be dynamic  
  //       cpu_time_limit: null,
  //       cpu_extra_time: null,
  //       wall_time_limit: null,
  //       memory_limit: null,
  //       stack_limit: null,
  //       max_processes_and_or_threads: null,
  //       enable_per_process_and_thread_time_limit: null,
  //       enable_per_process_and_thread_memory_limit: null,
  //       max_file_size: null,
  //       enable_network: null,
  //     })
  //   }
  //   let options = {

  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Credentials": true
  //     },
  //     body: JSON.stringify({
  //       "submissions": submissions
  //     })
  //   }
  //   console.log("opptitoj ",options)

  //   console.log(submissions)
  //   let postRequest = fetch("http://codeit.ddns.net:2358/submissions/batch?base64_encoded=true", options)

  //   // console.log(postRequest)

  //   postRequest.then((response) => response.json()).then((json) => {

  //     console.log(json)
  //     let x = 0
  //     let y = ''
  //     for (x = 0; x < json.length; x++) {
  //       y = y + json[x].token + ','
  //     }
  //     console.log(y)

  //     checkStatusAndHandleResponse(y)
  //   }
  //     // console.log(json)
  //   ).catch((err) => console.log(err))

  // };


  let data = JSON.stringify({
    source_code: btoa(`${code}`),
    language_id: langcode,  // should be dynamic
    number_of_runs: null,
    stdin: btoa(testcases[0].input), // should be dynamic
    expected_output: btoa(testcases[0].solution), // should be dynamic
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

  const handleRunCode = () => {

        let i = 0
    let submissions = []
    for (i = 0; i < testcases.length; i++) {
      // debugger
      console.log(testcases[i].input)
      submissions.push({
        source_code: btoa(`${code}`),
        language_id: langcode,  // should be dynamic
        number_of_runs: null,
        stdin: btoa(testcases[i].input), // should be dynamic
        expected_output: btoa(testcases[i].solution), // should be dynamic  
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
    let postRequest = fetch("http://codeit.ddns.net:2358/submissions/batch?base64_encoded=true", options)

    // postRequest.then((response) => response.json()).then((json) => checkStatusAndHandleResponse(json.token))
       postRequest.then((response) => response.json()).then((json) => {

      console.log(json)
      let x = 0
      let y = ''
      for (x = 0; x < json.length; x++) {
        y = y + json[x].token + ','
      }
      console.log("yyyyyyyyy"+y)

      checkStatusAndHandleResponse(y)
    }
      // console.log(json)
    ).catch((err) => console.log(err))

  };

  // function checkStatusAndHandleResponse(token) {
  //   console.log("hi")

  //   let getRequest = fetch("http://codeit.ddns.net:2358/submissions" + "/" + token + "?base64_encoded=true")

  //   getRequest.then((response) => {
  //     console.log(response)
  //     return response.json()
  //   })
  //     .then((answer) => {
  //       console.log(answer.status.description)
  //       setStatus(answer.status.description)
  //       if (answer.status.description == "In Queue" || answer.status.description == "Processing") {
  //         setTimeout(() => checkStatusAndHandleResponse(token), 1500)
  //       } else if (answer.status.description == "Error") {
  //         console.log("error")
  //       }
  //       else {
  //         console.log(answer)
  //         setOutput(answer.stdout)
  //         setConsoleOutput(answer.compile_output)
  //         console.log(answer.compile_output)
  //       }
  //     })
  // }

  const handleSubmit = async () => {


    // console.log(options)
    // let postRequest = fetch("http://codeit.ddns.net:2358/submissions", options)

    // postRequest.then((response) => response.json()).then((json) => checkStatusAndHandleResponse(json.token))


    console.log("after math")


    const docRef1 = await addDoc(collection(db, "groups", "ucmhzyng", "test", "3VpZkscNuOzXAbFw6utO", "problems", "kDu6Sbxb6RCrYsTdTBEM", "submissions"), {
      code: code,
      status: status,
      output: output,
      time: execTime
    });

    // /groups/ucmhzyng/test/3VpZkscNuOzXAbFw6utO/problems/kDu6Sbxb6RCrYsTdTBEM/submissions/LdtCPw6BWSCJXE4lKZZa
  }
  function checkStatusAndHandleResponse(token) {


    let getRequest = fetch("http://codeit.ddns.net:2358/submissions/batch?tokens=" + token + "&base64_encoded=true")

    getRequest.then((response) => {
      // console.log(response.json())

      return response.json()
    })
      .then((answer) => {
        // setStatus(answer.status.description)
        let submissions = answer.submissions
        let c = 0
        let output1 = ''
        console.log(submissions)
        setExecTime(submissions[0].time)
        let answerString=''
        let output2=''
        let inputString=''
        for (c = 0; c < submissions.length; c++) {

          
          let state = submissions[c].status.description
          
          setStatus(state)
          if (state == "In Queue" || state == "Processing" && state!=null) {
            setTimeout(() => checkStatusAndHandleResponse(token), 1500)
          } else if (state == "Error") {
            console.log("error")
          }
          else {

            output1= output1 + submissions[c].stdout+'\n'
            answerString = answerString + atob(submissions[c].stdout)+'\n'
            // output2= output2 + submissions[c].stdin+'\n'
            // inputString = inputString + atob(submissions[c].stdin)+'\n'

            console.log(output1)

            // setOutput(submissions[c].stdout)
            // console.log(answer.stdout)
          }
          // setSubmission(submissions[0])
          setOutput(answerString)
          // setInputString(inputString)
          console.log(output1)
        }
        // setOutput(output)

      }
      )
  }

  const handleChange = React.useCallback(
    (value, viewUpdate) => {
      setCode(value);
      console.log(value)
    },
    [code]
  );


//   const handleRunCode = async () => {
//     try {
//       setLoading(true);
//       await runCode(
//         code,
//         extension,
//         problemId,
//         setSubmission,
//         setResults,
//         setTypeSubmission,
//         userId,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitCode = async () => {
//     try {
//       setLoading(true);
//       await submitCode(
//         code,
//         extension,
//         problemId,
//         setSubmission,
//         setResults,
//         setTypeSubmission,
//         userId,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div className={styles.container}>
      <div className={styles.line}></div>
      <div className={styles.config}>
      <div className="editor-options">
            <Select className="select" options={langs} value={langs.value} onChange={handleLangChange} />
          </div>

        <a href='#' className={styles.theme} onClick={handleChangeTheme}>{themeButton}</a>
      </div>

      <CodeMirror
        height="400px"
        // language={language}
        theme={theme}
        value={template}
        extensions={langextension}
        onChange={handleChange}
      />

      <div className={styles.compile}>
        <div className={styles.buttons}>
          <button
            type='button'
            className={styles.run_button}
            onClick={handleRunCode}
            disabled={loading}
          >▶ Run Code</button>
          <button
            type='button'
            className={styles.submit_button}
            onClick={handleSubmit}
            disabled={loading}
          >☁ Submit</button>
        </div>
      </div>

      <div className={styles.line}></div>

      
        <SubmissionComponent
          status={status}
          output={output ? output:"No Output"}
          input={testcaseString}
          type={typeSubmission}
          // consoleOutput={atob(consoleOutput)}
        />
    </div>
  );
}
