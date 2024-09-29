import React, {useContext} from 'react'
import { add, bookmark, comment, fire, likes, nft } from '../assets'
c


const Posts = () => {
    const myPost = [0, 1, 2, 4, 5, 6, 7, 9]
    const { modals, setModals } = useContext(AppContext);
    

    return (
        <div className="flex-[0.8] bg-gray-200 overflow-y-scroll p-4">
            <div className='flex justify-between'>
                <p>Feeds</p>
                <div>
                    <img src={add} className='w-[30px] cursor-pointer' onClick={()=> setModals({ ...modals, CreatePostModal: true }) } />
                    <p className='text-[12px] -ml-4'>Create Post</p>
                </div>

            </div>

            {myPost?.map((e, i) => <div className='bg-white min-h-[50px] rounded-lg p-3 flex flex-col justify-between my-4' key={i}>
                <div>

                    <div className='flex justify-between my-2'>
                        <div className='w-[40px] h-[40px] bg-black rounded-full'>
                            <img src={nft} className='w-full h-full rounded-full' />

                        </div>
                        <div className='text-[10px]'>
                            <p><span className='font-semibold'>ID:</span> 0x32Be343B94f860124dC4fEe278FDCBD38C102D88</p>
                            <p><span className='font-semibold'>Username:</span> @Michael_12</p>
                            <p><span className='font-semibold'>Time:</span> 2hours ago</p>
                        </div>

                    </div>


                    <div>
                        <p className='text-[12px]'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


                        </p>
                    </div>
                </div>

                <div className=' h-[40px] flex items-center space-x-5 mt-4 text-[14px]'>
                    <div className='flex cursor-pointer'>
                        <img src={likes} className='w-[20px]' />
                        <p>0 Likes</p>
                    </div>
                    <div className='flex cursor-pointer'>
                        <img src={comment} className='w-[20px]' onClick={()=> setModals({ ...modals, CommentOnPostModal: true })}/>
                        <p>300 Comments</p>
                    </div>
                    <div className='flex cursor-pointer'>
                        <img src={fire} className='w-[20px]' onClick={()=> setModals({ ...modals, ignitePostModal: true })} />
                        <p>12 Ignite</p>
                    </div>
                    <div className='flex cursor-pointer'>
                        <img src={bookmark} className='w-[20px]' />
                        <p>Bookmark</p>
                    </div>

                </div>

            </div>)}

        </div>
    )
}

export default Posts
