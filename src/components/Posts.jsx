import React, { useContext, useEffect, useState } from 'react'
import { add, bookmark, comment, fire, likes, nft } from '../assets'
import { AppContext } from '../ContextAPI'
import { timeAgo } from '../helpers'
import ProfileModal from '../modals/ProfileModal'


const Posts = () => {
    const myPost = [0, 1, 2, 4, 5, 6, 7, 9]
    const [showProfileModal, setshowProfileModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const { modals, setModals, ignitePost, getPost, allPost, likeAPost, ignitePostData, setIgnitePostData, getPostAuthorDetails,getPostComments } = useContext(AppContext);
    const [formdata, setFormdata] = useState({
        pageNumber: 1,
        pageSize: 20
    })
    useEffect(() => {
        getPost(formdata)

    }, [])



    return (
        <div className="flex-[0.8] bg-gray-200 overflow-y-scroll p-4">
            <div className='flex justify-between'>
                <p>Feeds</p>
                <div>
                    <img src={add} className='w-[30px] cursor-pointer' onClick={() => setModals({ ...modals, CreatePostModal: true })} />
                    <p className='text-[12px] -ml-4'>Create Post</p>
                </div>

            </div>

            {allPost?.map((e, i) => <div className='relative bg-white min-h-[50px] rounded-lg p-3 flex flex-col justify-between my-4' key={i}>
                <div>

                    <div className='flex justify-between my-2'>
                        <div className='h-[40px] flex items-center space-x-1'>
                            <img src={nft} className='w-[40px] h-full rounded-full cursor-pointer bg-black' onMouseEnter={() => {
                                setCurrentIndex(i)
                                setshowProfileModal(true)
                            }} />
                            <p className='text-[11px] italic mt-4'><span className='font-semibold'>Author :</span> {e?.author?.substring(0, 4)}....{e?.author.substr(-5)}</p>


                        </div>
                        {showProfileModal && currentIndex == i && <ProfileModal setshowProfileModal={setshowProfileModal} address = {e?.author} />}

                        <div className='text-[10px]'>
                            <p className='italic text-gray-700'><span className='font-semibold'>Time:</span>{timeAgo(e?.createdAt)}</p>
                        </div>

                    </div>


                    <div>
                        <p className='text-[12px] mt-4'>
                            {e?.post}
                        </p>
                    </div>
                </div>

                <div className=' h-[40px] flex items-center space-x-5 mt-4 text-[14px]'>
                    <div className='flex cursor-pointer'>
                        <img src={likes} className='w-[15px]' onClick={() => likeAPost(e?.postId)} />
                        <p className='text-[12px] font-semibold'>{e?.likeCount} Like(s)</p>
                    </div>
                    <div className='flex cursor-pointer'>
                        <img src={comment} className='w-[15px]' onClick={() => {
                            getPostComments(e?.postId,e?.commentCount )
                            setModals({ ...modals, CommentOnPostModal: true })

                            setIgnitePostData({ ...ignitePostData, postId: e?.postId, author: e?.author })
                        }} />
                        <p className='text-[12px] font-semibold'>{e?.commentCount} Comment(s)</p>
                    </div>
                    <div className='flex cursor-pointer'>
                        <img src={fire} className='w-[15px]' onClick={() => {
                            setModals({ ...modals, ignitePostModal: true })
                            setIgnitePostData({ ...ignitePostData, postId: e?.postId, author: e?.author })


                        }} />
                        <p className='text-[12px] font-semibold'>{e?.igniteCount} Ignite(s)</p>
                    </div>
                    <div className='flex cursor-pointer'>
                        <img src={bookmark} className='w-[10px]' />
                        <p className='text-[12px] font-semibold'>Bookmark</p>
                    </div>

                </div>

            </div>)}

        </div>
    )
}

export default Posts
