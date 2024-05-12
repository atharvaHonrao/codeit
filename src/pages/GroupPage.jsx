import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { checkGroupAuth } from '../utilities/checkGroupAuth'
import { useAuthValue } from '../utilities/AuthContext'
import { db } from '../utilities/firebase'
import { getDoc, doc } from 'firebase/firestore'


export default function GroupPage() {
  const { currentUser } = useAuthValue()
  const id = useParams()
  const checkGroupAuth = async () => {
    // console.log(currentUser)
    if (currentUser === null) return ("Please sign in")
    // debugger
    // const groupRef = await getDoc(doc(db, "groups", `${id}`));
    const groupDoc = doc(db, "groups", `${id}`); // Construct the document reference correctly

    const groupRef = await getDoc(groupDoc);
    if (groupRef.adminId === currentUser.uid) {
      return "Admin";
    }
    else if (currentUser.uid in groupRef.participantsUid) {
      return "Member";
    }
  }


  const [groupAuth, setGroupAuth] = useState("") // ["Admin", "Member", "Not a member"


  useEffect(() => {
    const fetchAuth = async () => {
      const auth = await checkGroupAuth(id)
      setGroupAuth(auth)
    }
    fetchAuth()
  }, [])
  return (
    <>
      <h1>
        {groupAuth === "Admin" ? "Admin" : groupAuth === "Member" ? "Member" : "Not a member"}
      </h1></>
  )

}
