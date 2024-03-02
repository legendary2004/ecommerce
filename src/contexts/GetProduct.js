import { createContext, useReducer } from "react";

export const GetProductContext = createContext()

export default function GetProductProvider({children}) {
    const [state, dispatch] = useReducer(getProduct, {label: "", buttonAction: "", product: {id: "", name: "", category: "", price: 0}});

    function getProduct(state, action) {
        if (action.type == 'add') {
            return {
                label: "Add product",
                buttonAction: "add",
                product: {}
            }
        }
        if (action.type == 'edit') {
            return {
                label: "Edit product: " + action.product.name + " . Everything will be overrided",
                buttonAction: "edit",
                product: action.product
            }
        }
    }

    return (
        <GetProductContext.Provider value={{state, dispatch}}>
            {children}
        </GetProductContext.Provider>
    )
}