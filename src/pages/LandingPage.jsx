import React, { useState, useContext } from 'react'
import SideBar from '../components/SideBar'
import Posts from '../components/Posts'
import ProfilePage from '../components/ProfilePage'
import ChatWithAI from '../components/ChatWithAI'
import YourPost from '../components/YourPost'
import { AppContext } from '../ContextAPI'
import IgniteAPostModal from '../modals/IgniteAPostModal'
import CommentOnPostModal from '../modals/CommentOnPostModal'
import CreatePostModal from '../modals/CreatePostModal'



const LandingPage = () => {
  const [currentNav, setCurrentNav] = useState(0)
  const { modals, setModals } = useContext(AppContext);

  return (
    <div className='flex flex-1 h-screen font-poppins'>
      {modals.CreatePostModal && (<CreatePostModal />)}
      {modals.ignitePostModal && (<IgniteAPostModal />)}
      {modals.CommentOnPostModal && (<CommentOnPostModal />)}
      <SideBar currentNav={currentNav} setCurrentNav={setCurrentNav} />
      {currentNav == 0 && <Posts />}
      {currentNav == 1 && <ProfilePage />}
      {currentNav == 2 && <YourPost />}
      {currentNav == 4 && <ChatWithAI />}


    </div>
  )
}

export default LandingPage
