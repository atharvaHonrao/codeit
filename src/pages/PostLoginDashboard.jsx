import React from 'react'
import '../styles/postlogindb.css'
import { useState } from 'react'
import CreateGroup from './CreateGroup'
import { useNavigate } from 'react-router-dom'


function PostLoginDashboard() {
  const [isGroupVisible, setGroupVisible] = useState(false)
  const navigate = useNavigate()
  const handleGroup = () => {
    setGroupVisible(!isGroupVisible)
  };

  return (<>
    {isGroupVisible && <CreateGroup boolState={isGroupVisible} changeBoolState={setGroupVisible}
                
            />}
    <div className='big-container'>

      <br></br>
      <p className='welcome'>Welcome</p>
      <br /><br />
      <div class="groups">
        <div class="column">
          <p className='col-header'>Join a Group</p>
          <input type="text" placeholder="Enter Group Code" className='code-input' />
          <button class="join-button">Join Group</button>
        </div>
        <div class="vertical-line"></div>
        <div class="column">
          <p className='col-header'>Create a group</p>
          <p className='col-text'>Create your own group and invite your others to code!</p>
          <button class="create-button" onClick={handleGroup}>Create Group</button>
        </div>
      </div>

      <br /><br />

      <div className="practice-container">
        <div className="textual">
          <p className='col-header'>Begin your own coding journey on CodeIt today!</p>
          <button className='practice' onClick={() => navigate('/practice')}>Practice</button>
          <button onClick={() => navigate('/group/ucmhzyng')}>Open group</button>
        </div>
        {/* <div className="image-part">
          <img src='../images/practice.png' className='motivate' />
        </div> */}
      </div>



    </div></>
  )
}

export default PostLoginDashboard
