import React, { useContext, useState } from 'react'
import { AppContext } from '../ContextAPI'
import { axiosInstance } from '../helpers'
import axios from 'axios'

const CreatePostModal = () => {
  const { modals, setModals } = useContext(AppContext)
  const [textData, setTextdata] = useState("")
  const [viewImage, setViewImage] = useState()
  const [file, setFile] = useState()

  const handleTextChange = (e) => {
    if (textData?.length < 300) {

      setTextdata(e.target.value)
    }

  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setViewImage(URL.createObjectURL(e.target.files[0]));

  }


  const createPost = async () => {
  
  const formData = new FormData();
  formData.append('file', file);
  const headers = {
    'Content-Type': 'multipart/form-data',
    'x-api-key': 't-65252b95b3eaad0020ed99be-796004d8d03c4ebc87b4e690'
  };

  try {
    const response = await axios.post("https://api.tatum.io/v3/ipfs", formData , { headers });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
   
   


  }

  return (
    <div className='fixed grid h-[100%] z-20 bg-modal-bg place-items-center w-full backdrop-blur-sm lg:px-0 px-4 top-0 font-poppins'>
      <div className='rounded-md  font-poppins bg-white p-4 w-2/5'>
        <div className='flex justify-between w-full'>
          <p></p>
          <p className='cursor-pointer bg-blue-600 p-2 rounded-full w-[30px] h-[30px] items-center flex justify-center text-white ' onClick={() => setModals({ ...modals, CreatePostModal: false })}>x</p>
        </div>
        <p className='font-semibold my-2 text-[12px]'>Create a post</p>
        <textarea name="" id="" className='outline-none  border border-black w-full p-2 text-[15px]' rows={4} onChange={(e) => handleTextChange(e)}></textarea>
        <div className='flex justify-between'>
          <input type="file" name="" id="" placeholder='AddFile' onChange={handleFileChange} />
        </div>
        {viewImage && <img src={viewImage} className='max-h-[400px] rounded-lg w-full flex justify-center mx-auto my-2' />}


        <div className='flex justify-between'>
          <p></p>
          <p className='text-[12px]'>{textData?.length ? textData?.length : "0"}/300</p>
        </div>

        <div className='flex justify-end'>
          <button className='bg-blue-600 rounded-md text-white px-4 py-2 my-4' onClick={() => createPost()}>Create</button>
        </div>

      </div>

    </div>
  )
}

export default CreatePostModal
