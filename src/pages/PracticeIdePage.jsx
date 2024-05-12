import React from 'react'
import DescriptionComponent from '../components/DescriptionComponent'
import HintsComponent from '../components/HintsComponent'
import styles from '../styles/pid.module.css'
import SubmissionComponent from '../components/SubmissionComponent'
import { useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import IdeComponent from '../components/IDEComponent'

export default function PracticeIdePage({title, description}) {
    const Location = useLocation()

  return (
    <div className={styles.container}>
        <DescriptionComponent title={Location.state.title}><ReactMarkdown>{Location.state.description}</ReactMarkdown></DescriptionComponent>
        {/* <HintsComponent hints={["help"]}/> */}
        <IdeComponent testcases={[{'input': 'test', 'output': 'test'}]}/>
    </div>
  )
}
