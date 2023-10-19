import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../utilities/firebase'
import AdminLand from '../pages/AdminLand'
import MemberPage from '../pages/MemberPage'
import { useAuthValue } from '../utilities/AuthContext'
import AdminGroup from '../pages/admingroup'

export default function RoleCheck(props) {
    const [userId, setUserId] = useState('')
    const { currentUser } = useAuthValue()
    const id = useParams()
    const [adminId, setAdminId] = useState('')
    useEffect(() => {
        if (currentUser) {
            setUserId(currentUser.uid);
      
            const fetchGroup = async () => {
              const docRef = doc(db, "groups", `${id.id}`);
              const docSnap = await getDoc(docRef);
              return docSnap.data().adminId;
            };
      
            const setAdminIdAsync = async () => {
              const fetchedAdminId = await fetchGroup();
              setAdminId(fetchedAdminId);
            };
      
            setAdminIdAsync();
          }
        }, [currentUser]);

    useEffect(() => {
        console.log(adminId)
        console.log(userId)
    }, [adminId, userId])
  return (
    <div>
        {adminId === userId ? <AdminGroup /> : <MemberPage id= {`${id.id}`} />}
    </div>
  )
}
