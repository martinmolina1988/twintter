import React, { useState, useEffect } from 'react';
import SignInSignUp from "./page/SignInSignUp";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLogedApi } from "./api/auth";
import Routing from "./routes/Routing";



export default function App() {




    const [user, setUser] = useState(null);
    const [loadUser, setLoadUser] = useState(false);
    const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);


    useEffect(() => {

        setRefreshCheckLogin(false);
        setUser(isUserLogedApi());
        setLoadUser(true);
    }, [refreshCheckLogin])
    if (!loadUser) {
        return null;
    }

    return (<AuthContext.Provider value={user} >

        { user ? (<><Routing setRefreshCheckLogin={setRefreshCheckLogin} /> </>) : (<div> <SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin} /> </div>)}

        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            pauseOnHover
            draggable

        />
    </AuthContext.Provider>
    );
}

