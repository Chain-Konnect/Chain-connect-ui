import React, { useState } from "react"
import { ethers, toNumber } from "ethers";
import toast from "react-hot-toast";
import { socialFIContractAddress, SocialFiABI, Holesky } from "./contractServices/constants";
import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';


export const AppContext = React.createContext();
const projectId = import.meta.env.VITE_APP_WALLET_CONNECT_ID


export const AppContextProvider = ({ children }) => {
    const { connect, disconnect, select, connected, address } = useWallet();
    const [modals, setModals] = useState({
        ignitePostModal: false,
        CreatePostModal: false,
        ViewProfileModal: false,
        CommentOnPostModal: false
    })



    const [activateAccountLoadingState, setActivateAccountLoadingState] = useState(false)
    const [igniteLoadingState, setIgniteLoadingState] = useState(false)
    const [commentLoadingState, setcommentLoadingState] = useState(false)

    const [userProfile, setUserProfile] = useState({})
    const [allPost, setAllPost] = useState([])
    const [ignitePostData, setIgnitePostData] = useState({
        postId: '',
        author: '',
        amount: 0
    })
    const [postAuthorProfile, setPostAuthorProfile] = useState({})
    const [postComments, setPostComments] = useState([])





    const initializeTronContract = async () => await window.tronWeb?.contract().at('THM4CeG8fGyJBs5VtAhz8teXS6q9SCFofn');



    const connectWallet = async () => {
        try {


            await initializeContract()

        } catch (error) {

        }
    }


    const initializeContract = (signerOrProvider) => new ethers.Contract(
        socialFIContractAddress,
        SocialFiABI,
        signerOrProvider
    )




    const getUserProfile = async () => {

        try {
            const _contract = await initializeTronContract()

            const profileData = await _contract.users(address).call()


            const parsedResult = {
                userId: profileData[0].toString(),  // BigInt to string
                userAddress: profileData[1],  // Address is already a string
                profileUrl: profileData[2] || null,  // Handle empty strings
                earnedAmount: profileData[3].toString(),  // BigInt to string
                igniteAmount: profileData[4].toString(),  // BigInt to string
                status: profileData[5],  // Boolean remains unchanged
                profileName: profileData[6] || null,
                followersCount: profileData[7].toString(),
                followingsCount: profileData[8].toString()
            }

            setUserProfile(parsedResult)

            return parsedResult


        } catch (error) {
            console.log(error, "this is error")
            return error

        }
    }


    const activateUser = async () => {
        setActivateAccountLoadingState(true)
        try {

            const _contract = await initializeTronContract()
            const status = await _contract.addUser().send(
                {
                    feeLimit: 200_000_000,
                    callValue: 1,
                    shouldPollResponse: true
                }

            )

            toast.success("Account activated")
            setActivateAccountLoadingState(false)



        } catch (error) {
            return toast.error("Account activated failed")

        }

    }

    const createAPost = async (_formdata) => {


        try {
            const _contract = await initializeTronContract()

            const status = await _contract.createAPost(
                _formdata?.post,
                _formdata?.imageOne,
                _formdata?.imageTwo
            ).send({
                feeLimit: 200_000_000,
                callValue: 0,
                shouldPollResponse: true
            });
            if (status) {

                return true
            }




        } catch (error) {
            console.log(error)
            return false

        }
    }

    const likeAPost = async (_postId) => {

        try {

            const _contract = await initializeTronContract()

            const status = await _contract.likeAPost(
                _postId
            ).send({
                feeLimit: 200_000_000,
                callValue: 0,
                shouldPollResponse: true
            });



            return toast.success("Post liked")
        } catch (error) {

            return toast.error("Error occured")

        }
    }

    const commentPost = async (_formdata) => {
        setcommentLoadingState(true)

        try {

            const _contract = await initializeTronContract()

            const status = await _contract.commentOnPost(
                _formdata?.postId,
                _formdata?.comment,
                _formdata?.imageOne,
                _formdata?.imageTwo
            ).send({
                feeLimit: 200_000_000,
                callValue: 0,
                shouldPollResponse: true
            });


            toast.success("Comment posted")
            setcommentLoadingState(false)
            setModals({ ...modals, CommentOnPostModal: false })
        } catch (error) {
            setcommentLoadingState(false)
            return toast.success("Error occured")

        }
    }

    const ignitePost = async (_postId, _address, amount) => {
        setIgniteLoadingState(true)

        try {

            const _contract = await initializeTronContract()

            const status = await _contract.igniteAPost(
                _postId,
                _address,

            ).send({
                feeLimit: 100_000_000,
                callValue: amount,
                shouldPollResponse: true
            })


            toast.success("Post ignited")
            setIgniteLoadingState(false)
            setModals({ ...modals, ignitePostModal: false })
        } catch (error) {
            setIgniteLoadingState(false)
            return toast.error("Error occured")

        }
    }

    const followUser = async (_formdata) => {
        const { _address } = _formdata
        try {

            const _contract = await initializeContract()

            const status = await _contract.followUser(
                _address

            )
            await status.wait();

            return status
        } catch (error) {
            console.log(error)
            return toast.success("Error occured")

        }
    }

    const unfollowUser = async (_formdata) => {
        const { _address } = _formdata
        try {

            const _contract = await initializeContract()

            const status = await _contract.unfollowUser(
                _address

            )


            return status
        } catch (error) {
            console.log(error)
            return toast.success("Error occured")

        }
    }
    const getPost = async (_formdata) => {
        try {
            const posts = []
            const contract = await initializeTronContract()
            const postID = await contract.postId().call()


            for (let i = 0; i < postID; i++) {
                const e = await contract.posts(i).call()
                posts.push({
                    postId: e?.postId.toString(),
                    author: e?.author,
                    post: e?.post,
                    imageOne: e?.imageOne,
                    imageTwo: e?.imageTwo,
                    likeCount: e?.likeCount.toString(),
                    igniteCount: e?.igniteCount.toString(),
                    commentCount: e?.commentCount.toString(),
                    createdAt: Number(e?.createdAt)
                })

            }

            setAllPost(posts.reverse())


            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }


    const getPostAuthorDetails = async (_address) => {
        try {

            const _contract = await initializeTronContract()

            const status = await _contract.users(
                _address

            ).call()




            const parsedResult = {
                userId: status[0].toString(),  // BigInt to string
                userAddress: status[1],  // Address is already a string
                profileUrl: status[2] || null,  // Handle empty strings
                earnedAmount: status[3].toString(),  // BigInt to string
                igniteAmount: status[4].toString(),  // BigInt to string
                status: status[5],  // Boolean remains unchanged
                profileName: status[6] || null,
                followersCount: status[7].toString(),
                followingsCount: status[8].toString()
            }

            setPostAuthorProfile(parsedResult)
        } catch (error) {


        }

    }

    const claimRewards = async (amount) => {

        try {
            const _contract = await initializeTronContract()

            const status = await _contract.claimRewards().send({
                feeLimit: 200_000_000,
                callValue: amount,
                shouldPollResponse: true
            })
            return toast.success("Rewards claimed")
        } catch (error) {
            console.log("Error occured", error)
            return toast.error("Rewards not claimed")
        }


    }

    const getPostComments = async (postId, commentCount) => {
        try {
            const _contract = await initializeTronContract()
            const comments = []

            for (let i = 0; i < commentCount; i++) {
                const e = await _contract.postComments(postId, i).call()
                comments.push({
                    author: e?.author.toString(),
                    comment: e?.comment,
                    imageOne: e?.imageOne,
                    imageTwo: e?.imageTwo,
                    createdAt: Number(e?.createdAt)
                })

            }


            setPostComments(comments.reverse())


        } catch (error) {
            console.log(error)

        }

    }



    return (
        <>
            <AppContext.Provider value={{
                address,
                modals,
                setModals,
                getUserProfile,
                userProfile,
                setUserProfile,
                activateUser,
                activateAccountLoadingState,
                likeAPost,
                commentPost,
                getPost,
                followUser,
                unfollowUser,
                createAPost,
                ignitePost,
                allPost,
                ignitePostData,
                setIgnitePostData,
                connectWallet,
                getPostAuthorDetails,
                claimRewards,
                postAuthorProfile,
                setPostAuthorProfile,
                getPostComments,
                postComments,
                setPostComments,
                igniteLoadingState,
                commentLoadingState



            }}>

                {children}
            </AppContext.Provider>

        </>
    )
}