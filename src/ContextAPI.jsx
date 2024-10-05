import React, { useState } from "react"
import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ethers, toNumber } from "ethers";
import toast from "react-hot-toast";
import { socialFIContractAddress, SocialFiABI, Holesky } from "./contractServices/constants";

export const AppContext = React.createContext();


export const AppContextProvider = ({ children }) => {
    const [modals, setModals] = useState({
        ignitePostModal: false,
        CreatePostModal: false,
        ViewProfileModal: false,
        CommentOnPostModal: false
    })

    const [activateAccountLoadingState, setActivateAccountLoadingState] = useState(false)

    const [userProfile, setUserProfile] = useState({})
    const [allPost, setAllPost] = useState([])
    const [ignitePostData, setIgnitePostData] = useState({
        postId: '',
        author:'',
        amount:0
    })


    const { walletProvider } = useWeb3ModalProvider()
    const { address, chainId, isConnected } = useWeb3ModalAccount()


    const initializeContract = (signerOrProvider) => new ethers.Contract(
        socialFIContractAddress,
        SocialFiABI,
        signerOrProvider
    )

    const getSigner = async () => {
        if (!isConnected) return toast.error("Wallet not connected")
        const ethersProvider = new ethers.BrowserProvider(walletProvider)
        const _signer = await ethersProvider.getSigner()
        return _signer
    }

    const getProvider = async () => {
        const _provider = new ethers.JsonRpcProvider(Holesky?.rpcUrl)
        return _provider
    }


    const getUserProfile = async () => {
        try {
            const _provider = await getProvider()
            const _contract = await initializeContract(_provider)

            const profileData = await _contract.getUser(address)

            const parsedResult = {
                userId: profileData[0].toString(),  // BigInt to string
                userAddress: profileData[1],  // Address is already a string
                profileUrl: profileData[2] || null,  // Handle empty strings
                earnedAmount: profileData[3].toString(),  // BigInt to string
                status: profileData[4],  // Boolean remains unchanged
                profileName: profileData[5] || null,
                followersCount: profileData[6].toString(),
                followingsCount: profileData[7].toString()
            }
            console.log(parsedResult, "PARS")
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
            const _signer = await getSigner()
            const _contract = await initializeContract(_signer)

            const status = await _contract.addUser()

            return toast.success("Account activated")
            setActivateAccountLoadingState(false)



        } catch (error) {
            console.log(error, "this is error")
            return toast.error("Account activated failed")
            setActivateAccountLoadingState(false)

        }

    }

    const createAPost = async (_formdata) => {


        try {
            const _signer = await getSigner()
            const _contract = await initializeContract(_signer)

            const status = await _contract.createAPost(
                _formdata?.post,
                _formdata?.imageOne,
                _formdata?.imageTwo
            )
            await status.wait();

            return true
        } catch (error) {
            console.log(error)
            return false

        }
    }

    const likeAPost = async (_postId) => {

        try {
            const _signer = await getSigner()
            const _contract = await initializeContract(_signer)

            const status = await _contract.likeAPost(
                _postId
            )
            await status.wait();

            return toast.success("Post liked")
        } catch (error) {
            console.log(error)
            return toast.error("Error occured")

        }
    }

    const commentPost = async (_formdata) => {
        try {
            const _signer = await getSigner()
            const _contract = await initializeContract(_signer)

            const status = await _contract.commentOnPost(
                _formdata?.postId,
                _formdata?.comment,
                _formdata?.imageOne,
                _formdata?.imageTwo
            )
            await status.wait();

            return status
        } catch (error) {
            console.log(error)
            return toast.success("Error occured")

        }
    }

    const ignitePost = async (_postId, _address, amount) => {

        try {
            const _signer = await getSigner()
            const _contract = await initializeContract(_signer)

            const status = await _contract.igniteAPost(
                _postId,
                0,
                _address,
                { value: ethers.parseUnits(`${amount}`, "ether") }

            )
            await status.wait();

            return toast.success("Post ignited")
        } catch (error) {
            console.log(error)
            return toast.error("Error occured")

        }
    }

    const followUser = async (_formdata) => {
        const { _address } = _formdata
        try {
            const _signer = await getSigner()
            const _contract = await initializeContract(_signer)

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
            const _signer = await getSigner()
            const _contract = await initializeContract(_signer)

            const status = await _contract.unfollowUser(
                _address

            )
            await status.wait();

            return status
        } catch (error) {
            console.log(error)
            return toast.success("Error occured")

        }
    }
    const getPost = async (_formdata) => {
        try {
            const _provider = await getProvider()
            const _contract = await initializeContract(_provider)

            const posts = await _contract.getRecentPosts(
                _formdata?.pageNumber,
                _formdata?.pageSize

            )
            const parsedPost = posts.map((e, i) => ({
                postId: e?.postId.toString(),
                author: e?.author,
                post: e?.post,
                imageOne: e?.imageOne,
                imageTwo: e?.imageTwo,
                likeCount: e?.likeCount.toString(),
                igniteCount: e?.igniteCount.toString(),
                commentCount: e?.commentCount.toString(),
                createdAt: toNumber(e?.createdAt)
            }))
            console.log(parsedPost, "YESS")
            setAllPost(parsedPost)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }







    return (
        <>
            <AppContext.Provider value={{
                modals,
                setModals,
                isConnected,
                address,
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
                setIgnitePostData

            }}>

                {children}
            </AppContext.Provider>

        </>
    )
}