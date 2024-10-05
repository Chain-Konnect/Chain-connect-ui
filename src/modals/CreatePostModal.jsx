import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../ContextAPI'
import { axiosInstance } from '../helpers'
import axios from 'axios'
import toast from 'react-hot-toast'
import { upload } from '../assets'

const tatumAPIKEY = import.meta.env.VITE_TATUM_API_KEY
const CreatePostModal = () => {
  const { modals, setModals, createAPost } = useContext(AppContext)
  const [textData, setTextdata] = useState("")
  const [viewImage, setViewImage] = useState()
  const [file, setFile] = useState()
  const [uploadState, setUploadState] = useState(false)
  const [createPostState, setCreatePostState] = useState(false)

  const [formdata, setFormData] = useState({
    post: '',
    imageOne: '',
    imageTwo: ''

  })

  useEffect(() => {

  }, [formdata])


  const handleTextChange = (e) => {
    if (textData?.length < 300) {

      setTextdata(e.target.value)
      setFormData({ ...formdata, post: e.target.value })
    }

  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setViewImage(URL.createObjectURL(e.target.files[0]));

  }

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const headers = {
      'Content-Type': 'multipart/form-data',
      'x-api-key': tatumAPIKEY
    };

    try {
      if (file) {
        setUploadState(true)
        const response = await axios.post("https://api.tatum.io/v3/ipfs", formData, { headers });
        console.log(response.data?.ipfsHash, "IPFS")
        if (response?.data?.ipfsHash) {
          setFormData({ ...formdata, imageOne: response.data?.ipfsHash })
          setUploadState(false)
          return toast.success("File uploaded")

        }
        setUploadState(false)

      }

    } catch (error) {
      setUploadState(false)
      return toast.error("Upload failed")

    }


  }


  const createPost = async () => {
    setCreatePostState(true)

    try {

      const post = await createAPost(formdata)
      if (post) {
        setCreatePostState(false)
        toast.success("Post created")
        setModals({ ...modals, CreatePostModal: false })
        return true
      } else {
        setCreatePostState(false)
        return toast.error("Error occured")
      }



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
        <p className='font-light italic text-[12px]'>Its is advisable to upload image first before creating a post</p>
        <textarea name="" id="" className='outline-none  border border-black w-full p-2 text-[15px]' rows={4} onChange={(e) => handleTextChange(e)}></textarea>
        <div className='flex justify-between'>
          <input type="file" name="" id="" placeholder='AddFile' onChange={handleFileChange} />
          {file && <div>
            <img src={upload} className='w-[40px] cursor-pointer' onClick={() => uploadImage()} />
            <p className='text-[10px]'>{!uploadState ? "upload" : "uploading"}</p>
          </div>
          }
        </div>
        {viewImage && <img src={viewImage} className='max-h-[400px] rounded-lg w-full flex justify-center mx-auto my-2' />}


        <div className='flex justify-between'>
          <p></p>
          <p className='text-[12px]'>{textData?.length ? textData?.length : "0"}/300</p>
        </div>

        <div className='flex justify-end'>
          {!createPostState ? <button className='bg-blue-600 rounded-md text-white px-4 py-2 my-4' onClick={() => createPost()}>Create Post</button> :
            <button className='bg-blue-600 rounded-md text-white px-4 py-2 my-4 italic' >Creating Post ...</button>

          }
        </div>

      </div>

    </div>
  )
}

export default CreatePostModal
