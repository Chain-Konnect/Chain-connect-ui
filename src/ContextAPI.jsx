import React, { useState } from "react"
import { useWeb3ModalProvider,useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ethers } from "ethers";

export const AppContext = React.createContext();


export const AppContextProvider = ({ children }) => {
    const [modals, setModals] = useState({
        ignitePostModal: false,
        CreatePostModal: false,
        ViewProfileModal:false,
        CommentOnPostModal:false
    })




    return (
        <>
            <AppContext.Provider value={{
                modals,
                setModals

            }}>

                {children}
            </AppContext.Provider>

        </>
    )
}