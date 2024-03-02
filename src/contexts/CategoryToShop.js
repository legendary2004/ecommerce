import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

export const ShoppingContext = createContext()
export default function ShoppingContextProvider({children}) {
    const [category, setCategory] = useState({});

    useEffect(() => {
        setCategory(JSON.parse(window.localStorage.getItem('category')))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('category', JSON.stringify(category))
    }, [category])

    async function dispatch(item) {
        const res = await getDoc(doc(db, "categories", item.id))
        const obj = {...res.data(), currentPage: 1}
        let productsLength = 0;
        for (let i = 0; i < obj.products.length; i += 9) productsLength += 1 
        const arrayOfProducts = []
        for (let i = 0; i < productsLength; i++) arrayOfProducts.push(obj.products.slice(i * 9, 9 + i * 9))
        obj.products = arrayOfProducts
        setCategory(obj)
    }

    return (
        <ShoppingContext.Provider value={{category, dispatch}}>
            {children}
        </ShoppingContext.Provider>
    )
}