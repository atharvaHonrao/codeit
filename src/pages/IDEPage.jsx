import React from 'react'
import IdeComponent from '../components/IDEComponent'
import DescriptionComponent from '../components/DescriptionComponent'
import HintsComponent from '../components/HintsComponent'
import styles from '../styles/pid.module.css'
import SubmissionComponent from '../components/SubmissionComponent'

export default function IdePage() {
  return (
    <div className={styles.container}>
        <DescriptionComponent title={"help again"}>something</DescriptionComponent>
        <HintsComponent hints={["help"]}/>
        <IdeComponent templates={["help"]} input="help" problemId="help" userId="help"/>
        <SubmissionComponent status="hello" input="fuwf" output="loooolll" type={["yooo"]}/>
    </div>
  )
}
