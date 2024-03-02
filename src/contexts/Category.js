import { createContext, useReducer } from "react";

export const CategoryContext = createContext();
export default function CategoryContextProvider({children}) {
    const [category, dispatch] = useReducer(getCategory, {label: "", button: "", value: {id: "", name: ""}});

    function getCategory(state, action) {
        if (action.type == 'add') {
            return {
                label: "Create new category",
                value: {id: "", name: ""},
                button: "Add new category"
            }
        }
        else if (action.type == 'edit') {
            return {
                label: "Edit category: " + action.value.name,
                value: {id: action.value.id, name: action.value.name},
                button: "Edit category"
            }
        }
        else if (action.type == 'remove') {
            return {
                label: 'a',
                value: {id: action.value.id, name: action.value.name},
                button: ""
            }
        }
        else if (action.type == 'addTag') {
            return {
                label: "Create new tag",
                value: {id: "", name: ""},
                button: "Add new tag"
            }
        }
        else if (action.type == 'editTag') {
            return {
                label: "Edit tag: " + action.value.name,
                value: {id: action.value.id, name: action.value.name},
                button: "Edit tag"
            }
        }
        else if (action.type == 'removeTag') {
            return {
                label: 'b',
                value: {id: action.value.id, name: action.value.name},
                button: ""
            }
        }
        else if (action.type == 'removeProduct') {
            return {
                label: 'c',
                value: {id: action.value.id, name: action.value.name},
                button: ""
            }
        }
        else if (action.type == 'cancel') {
            return {
                label: "",
                value: {id: "", name: ""},
                button: ""
            }
        }
    }

    return (
        <CategoryContext.Provider value={{category, dispatch}}>
            {children}
        </CategoryContext.Provider>
    )
}