import React, { createContext, useEffect, useState } from 'react';
import { onStateAuthChangeListener } from '../../utils/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export default function UserProvide({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser }
    useEffect(() => {
        const unsub = onStateAuthChangeListener((user) => {

            setCurrentUser(user);
        })

    }, [])
    return (<UserContext.Provider value={value}>{children}</UserContext.Provider>)
}

