import React from 'react'
import { useAuthValue } from '../utilities/AuthContext'

export default function CheckUser() {
    const { currentUser } = useAuthValue()
  return (
    <div>{currentUser.displayName}</div>
  )
}
