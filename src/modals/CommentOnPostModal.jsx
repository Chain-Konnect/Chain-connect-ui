import React, { useContext, useState } from 'react'
import { AppContext } from '../ContextAPI'

const CommentOnPostModal = () => {
  const { modals, setModals } = useContext(AppContext);
  const [textCount, setTextCount] = useState(200)
  return (
    <div className='fixed grid h-[100%] z-20 bg-modal-bg place-items-center w-full backdrop-blur-sm lg:px-0 px-4 top-0 font-poppins'>
      <div className='rounded-md  font-poppins bg-white p-4 w-2/5'>
        <div className='flex justify-between w-full'>
          <p></p>
          <p className='cursor-pointer bg-blue-600 p-2 rounded-full w-[30px] h-[30px] items-center flex justify-center text-white ' onClick={() => setModals({ ...modals, CommentOnPostModal: false })}>x</p>
        </div>
        <p className='font-semibold my-2 text-[12px]'>Comment on @Michael's Post</p>
        <div>
          <textarea name="" id="" className='outline-none  border border-black w-full p-2 text-[15px]' rows={4}></textarea>
          <div className='flex justify-between'>
            <p></p>
            <p className='text-[12px]'>3/200</p>
          </div>

        </div>
        <div className='flex justify-end'>
          <button className='bg-blue-600 rounded-md text-white px-4 py-2 my-4'>Send</button>
        </div>

      </div>

    </div>
  )
}

export default CommentOnPostModal
