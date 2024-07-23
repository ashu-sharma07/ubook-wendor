import { createContext, useReducer, useState, useMemo, useContext } from "react";
import authReducer, { initialUserState } from "../utils/authReducer";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    let initState = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : initialUserState;
    const [state, dispatch] = useReducer(authReducer, initState);
    const [loading, setLoading] = useState(true);
    const updateState = () => {
        dispatch({
            type: "Reload",
            payload: !state.reload,
        });
    };

    const updateUser = (data) => {
        dispatch({
            type: "updateUser",
            payload: data,
        });
        localStorage.setItem("user", JSON.stringify(data));
    };
    const handleLogin = (auth, token) => {
        dispatch({
            type: "loginUser",
            payload: auth,
        });
        if (token) {
            localStorage.setItem("token", token);
        }
        localStorage.setItem("user", JSON.stringify(auth));
    };

    const resetUser = () => {
        dispatch({
            type: "Reset_Data",
        });
        localStorage.clear();
    };

    const memoizedValue = useMemo(() => ({
        updateUser,
        loading,
        setLoading,
        resetUser,
        updateState,
        user: state,
        handleLogin,
        dispatch,
    }), [state, loading]); // Only update when state or loading changes

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuthContext() {
    return useContext(AuthContext);
}


export { AuthContext, AuthContextProvider };
