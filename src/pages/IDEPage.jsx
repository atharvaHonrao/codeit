import React from 'react'
import IdeComponent from '../components/IDEComponent'
import DescriptionComponent from '../components/DescriptionComponent'
import HintsComponent from '../components/HintsComponent'
import styles from '../styles/pid.module.css'
import SubmissionComponent from '../components/SubmissionComponent'
import { useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

export default function IdePage({ title, description }) {
  const Location = useLocation()
  // console.log(Location.state.testcases)
  const testcases = Location.state.testcases

  return (
    <div className={styles.container}>
      <DescriptionComponent title={Location.state.title}><ReactMarkdown>{Location.state.description}</ReactMarkdown></DescriptionComponent>
      {/* <HintsComponent hints={["help"]}/> */}
      <IdeComponent testcases={testcases} />
    </div>
  )
}
