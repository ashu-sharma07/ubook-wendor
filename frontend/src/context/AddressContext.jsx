import { createContext, useState, useContext } from "react";

const AddressContext = createContext();

const AddressContextProvider = ({ children }) => {
    const [address, setAddress] = useState(() => {
        return localStorage.getItem("address") && localStorage.getItem("user") ? JSON.parse(localStorage.getItem("address")) : {
            street: "",
            city: "",
            pinCode: "",
        }
    })
    const [loading, setLoading] = useState(true);
    const updateUserAddress = (data) => {
        setAddress(data);
        localStorage.setItem("address", JSON.stringify(data));
    };
    return (
        <AddressContext.Provider value={{
            address,
            setAddress,
            loading,
            setLoading,
            updateUserAddress
        }}>
            {children}
        </AddressContext.Provider>
    );
};

export function useAddressContext() {
    return useContext(AddressContext);
}


export { AddressContext, AddressContextProvider };
