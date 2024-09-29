import React, { useState } from "react"
import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

export const AppContext = React.createContext();


export const AppContextProvider = ({ children }) => {
    const [modals, setModals] = useState({
        ignitePostModal: false,
        CreatePostModal: false,
        ViewProfileModal: false,
        CommentOnPostModal: false
    })


    const { walletProvider } = useWeb3ModalProvider()
    const { address, chainId, isConnected } = useWeb3ModalAccount()


    const initializeContract = (signerOrProvider) => new ethers.Contract(
        "contractAddrss",
        "contractABI",
        signerOrProvider
    )

    const getSigner = async () => {
        if (!isConnected) return toast.error("Wallet not connected")
        const ethersProvider = new ethers.BrowserProvider(walletProvider)
        const _signer = await ethersProvider.getSigner()
        return _signer
    }

    const getProvider = async () => {
        const _provider = new ethers.JsonRpcProvider("RPC OF CHAIN")
        return _provider
    }







    return (
        <>
            <AppContext.Provider value={{
                modals,
                setModals,
                isConnected,
                address

            }}>

                {children}
            </AppContext.Provider>

        </>
    )
}