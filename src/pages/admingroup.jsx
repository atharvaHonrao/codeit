import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../utilities/firebase'
import { useStateWithCallbackLazy } from 'use-state-with-callback'
import '../styles/admingroup.css'
function AdminGroup() {

  const id = useParams()
  const [isGroupVisible, setGroupVisible] = useState(false)
  const handleGroup = () => {
      setGroupVisible(!isGroupVisible)
  };
  // const [, forceRender] = useState(undefined);
  const [group, setGroup] = useStateWithCallbackLazy({
      name: "",
      description: "",
      problems: [],
      members: [],
      membersName: []
  })

  useEffect(() => {
      console.log(id)
      const fetchGroup = async () => {
          const docRef = doc(db, "groups", `${id.id}`);
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data())
          setGroup({
              name: docSnap.data().name,
              description: docSnap.data().description,
              members: docSnap.data().participantsUid,
              membersName: []
              // problems: docSnap.data().problems,
              // members: docSnap.data().members
          }, (group2) => {
              const fetchUsername = async () => {
                  const names = [];
                  for (const member of group2.members) {
                      console.log(member)
                      const docRef = doc(db, "users", member);
                      const docSnap = await getDoc(docRef);
                      console.log(docSnap.data());
                      // debugger
                      names.push(docSnap.data().name);
                  }
                  console.log(names);
                  setGroup({ ...group2, membersName: names });

              }

              fetchUsername()
          })
      }
      fetchGroup()


  }, [])

  useEffect(() => {
      // This will show the updated user state in the console
      console.log(group);
  }, [group]);

  return (
    <div><Sidebar />
      <div className="agcontainer">
        <div className="agheader flex">
          <div>
            <h1>{group.name}</h1>
            {/* <h4>Admin : Admin Name</h4> */}
          </div>
          <p>{group.description}</p>
        </div>
        <hr />
        <hr />
        <div className='agmainbody'>
          <div className='flex agmainbodyheader'>
            <h2>Group Assignments</h2>
            <button>+ new Assignment</button>
          </div>
        </div>
        {/* {
                                    group.membersName.map((member) => {
                                        console.log(member)
                                        return (

                                            <tr key={member}>
                                                <td>{member}</td>
                                                <td>hello</td>
                                            </tr>
                                        )
                                    })
                                } */}

{group.membersName.map((member, queIndex) => {
  // const isOpen = openStates[queIndex];

  return (
    <div key={queIndex} className={`accordion-wrapper`}>
      <div className={`quetitle flex`}>
        <div>
          <div className={`accordion-title`} onClick={() => toggleAccordion(queIndex)}>{member}</div>
          
        </div>
      </div>

    </div>
  );
})}

      </div>
    </div>
  )
}

export default AdminGroup