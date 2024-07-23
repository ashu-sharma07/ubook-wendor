import React, { createContext, useContext } from 'react'

const ModalContext = createContext();
export function ModalContextProvider({ children }) {
    const [loginModalOpen, setLoginModalOpen] = React.useState(false);
    const [locationModalOpen, setLocationModalOpen] = React.useState(false);
    return (
        <ModalContext.Provider value={{
            loginModalOpen, setLoginModalOpen,
            locationModalOpen, setLocationModalOpen,
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export { ModalContext };

export function useModalContext() {
    return useContext(ModalContext);
}