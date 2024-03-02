import { createContext, useState, useEffect } from "react";

export const ProductOverviewContext = createContext()
export default function ProductOverviewContextProvider({children}) {
    const [state, setState] = useState("")

    useEffect(() => {
        setState(window.localStorage.getItem('state'))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('state', state)
    }, [state])

    function getProduct(id) {
        setState(id)
    }

    return (
        <ProductOverviewContext.Provider value={{state, getProduct}}>
            {children}
        </ProductOverviewContext.Provider>
    )
}