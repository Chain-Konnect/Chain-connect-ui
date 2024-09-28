import React, { useState } from "react"

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