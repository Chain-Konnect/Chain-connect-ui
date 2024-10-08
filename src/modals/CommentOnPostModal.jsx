import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../ContextAPI'
import { edgelessTestnet } from 'wagmi/chains';
import { timeAgo } from '../helpers';

const CommentOnPostModal = () => {
  const { modals, setModals, commentPost, setPostComments, ignitePostData, postComments, commentLoadingState } = useContext(AppContext);
  const [textCount, setTextCount] = useState("")
  const myList = [1, 2, 3, 5]


  const [formdata, setFormData] = useState({
    postId: '',
    comment: '',
    imageOne: '',
    imageTwo: ''

  })
  const handleTextChange = (e) => {
    if (textCount?.length < 200) {

      setTextCount(e.target.value)
      setFormData({ ...formdata, comment: e.target.value, postId: ignitePostData?.postId })

    }

  }

  useEffect(() => {

  }, [formdata, postComments])
  return (
    <div className='fixed grid h-[100%] z-20 bg-modal-bg place-items-center w-full backdrop-blur-sm lg:px-0 px-4 top-0 font-poppins'>
      <div className='rounded-md  font-poppins bg-white p-4 w-2/5'>
        <div className='flex justify-between w-full'>
          <p></p>
          <p className='cursor-pointer bg-blue-600 p-2 rounded-full w-[30px] h-[30px] items-center flex justify-center text-white ' onClick={() => {
            setPostComments([])
            setModals({ ...modals, CommentOnPostModal: false })
          }}>x</p>
        </div>
        <p className='font-semibold my-2 text-[12px]'>Comments</p>
        <div className='my-2 overflow-scroll max-h-[200px]'>
          {postComments?.map((e, i) =>
            <div className='text-black text-[10px] rounded-md m-2 shadow-lg p-4' key={i}>
              <div className='flex justify-between w-full my-2'>
                <p className='italic'><span className='font-semibold'>User : </span> {e?.author}</p>
                <p> {timeAgo(e?.createdAt)}</p>

              </div>
              <p className=''><span className='font-semibold'>Message : </span>{e?.comment}</p>

            </div>

          )}

        </div>
        <div>
          <p className='text-[10px] font-semibold my-2'>Post your comment </p>
          <textarea name="" id="" className='outline-none  border border-black w-full p-2 text-[15px]' rows={4} onChange={(e) => handleTextChange(e)}></textarea>
          <div className='flex justify-between'>
            <p></p>
            <p className='text-[12px]'>{textCount?.length ? textCount?.length : "0"}/200</p>
          </div>

        </div>
        <div className='flex justify-end'>
         {!commentLoadingState && <button className='bg-blue-600 rounded-md text-white px-4 py-2 my-4 text-[10px]' onClick={() => commentPost(formdata)}>Send</button>}
         {commentLoadingState && <button className='bg-blue-600 rounded-md text-white px-4 py-2 my-4 italic text-[10px]'>Commenting ....</button>}
        </div>

      </div>

    </div>
  )
}

export default CommentOnPostModal
