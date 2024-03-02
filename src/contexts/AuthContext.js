import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export default function UserContextProvider({children}) {
    const [user1, setUser] = useState("")

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setUser(user)
        })

        return () => {
            unsub()
        }
    }, [])

    return (
        <UserContext.Provider value={user1}>
            {children}
        </UserContext.Provider>
    )


}