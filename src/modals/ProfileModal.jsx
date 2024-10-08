import React, {useEffect, useContext} from 'react'
import { AppContext } from '../ContextAPI';

const ProfileModal = ({ setshowProfileModal, address }) => {
    const { getPostAuthorDetails, postAuthorProfile, setPostAuthorProfile } = useContext(AppContext);
useEffect(() => {
    getPostAuthorDetails(address)
}, [])

    return (
        <div className='absolute bg-white rounded-lg min-h-[150px] min-w-[400px] z-50 ml-20 border cursor-pointer p-3 font-poppins shadow-md' onMouseLeave={() => {
            
            setshowProfileModal(false)
            setPostAuthorProfile({})
        }}>
            <p className='italic'>Profile Details</p>
            <div className='flex flex-col items-center mt-5 text-[10px]'>
                <p> <span className='font-semibold'>Author</span> : {postAuthorProfile?.userAddress ?? "Fetching ...."}</p>
                <p><span className='font-semibold'>Username</span> : {postAuthorProfile?.profileName ?? "N/A"}</p>
                <div className='flex space-x-2'>
                    <p><span className='font-semibold'>Followers</span> : {postAuthorProfile?.followersCount ?? 0}</p>
                    <p><span className='font-semibold'>Followings</span> : {postAuthorProfile?.followingsCount ?? 0}</p>

                </div>
                {/* <div className='flex space-x-2'>
                    <button className='bg-orange-600 p-3 rounded-sm text-white text-[12px] w-3/2'>Follow</button>
                </div> */}
            </div>

        </div>
    )
}

export default ProfileModal
